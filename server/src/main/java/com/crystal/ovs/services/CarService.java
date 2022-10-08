package com.crystal.ovs.services;

import com.crystal.ovs.dto.DtoCar;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.exceptions.CarNotFoundException;
import com.crystal.ovs.models.Car;
import com.crystal.ovs.repositories.CarRepository;
import com.crystal.ovs.repositories.EngineRepository;
import com.crystal.ovs.repositories.TransmissionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CarService {
    private final CarRepository carRepository;
    private final EngineRepository engineRepository;
    private final TransmissionRepository transmissionRepository;


    public List<Car> getAllCars(){
        return this.carRepository.findAll();
    }

    public Car getCarById(Long id){
        return carRepository
                .findById(id)
                .orElseThrow(CarNotFoundException::new);
    }

    public Response<Car> insertCar(DtoCar dtoCar){
        Response<Car> response = new Response<>();
        response.setErrors(validate(dtoCar));

        if(response.getErrors().size() == 0){
            Car car = new Car();
            car.setFields(dtoCar);
            response.setResponseBody(carRepository.save(car));
        }

        return response;
    }

    @Transactional
    public Response<Car> updateCar(Long id, DtoCar dtoCar){
        Response<Car> response = new Response<>();
        response.setErrors(validate(dtoCar));

        Car car = carRepository
                .findById(id)
                .orElseThrow(CarNotFoundException::new);

        if(response.getErrors().size() == 0){
            car.setFields(dtoCar);
            response.setResponseBody(car);
        }

        return response;
    }

    public String deleteCar(Long id){
        if(!carRepository.existsById(id)){
            throw new CarNotFoundException();
        }

        carRepository.deleteById(id);
        return "Car removed";
    }

    private List<String> validate(DtoCar dtoCar) {
        List<String> validationErrors = new ArrayList<>();

        if (dtoCar.getBrand().isEmpty()) {
            validationErrors.add("ERROR: Brand can't be empty");
        }
        if (dtoCar.getModel().isEmpty()) {
            validationErrors.add("ERROR: Model can't be empty");
        }
        if (dtoCar.getAvailable() < 0) {
            validationErrors.add("ERROR: Available can't be lower than zero");
        }
        if (dtoCar.getManufacturingYear() < 2019) {
            validationErrors.add("ERROR: This model of car is already out of manufacturing time");
        }
        if (dtoCar.getManufacturingYear() > 2023) {
            validationErrors.add("ERROR: This model of car is not out yet");
        }

        if(dtoCar.getEngineId() == null){
            validationErrors.add("Missing engine id");
        } else if(!engineRepository.existsById(dtoCar.getEngineId())){
            validationErrors.add("There is no engine with that id");
        } else {
            dtoCar.setEngine(engineRepository.findById(dtoCar.getEngineId()).get());
        }

        if(dtoCar.getTransmissionId() == null){
            validationErrors.add("Missing transmission id");
        } else if(!transmissionRepository.existsById(dtoCar.getTransmissionId())){
            validationErrors.add("There is no transmission with that id");
        }else {
            dtoCar.setTransmission(transmissionRepository.findById(dtoCar.getTransmissionId()).get());
        }

        if (dtoCar.getNumberOfDoors() < 1 || dtoCar.getNumberOfDoors() > 6) {
            validationErrors.add("ERROR: A car can have a min number of doors of 1 and a maximum of 6");
        }
        if(dtoCar.getColor().isEmpty()) {
            validationErrors.add("ERROR: You have to enter a color!");
        }
        return validationErrors;
    }

}
