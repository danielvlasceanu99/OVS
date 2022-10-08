package com.crystal.ovs.controllers;

import com.crystal.ovs.dto.DtoCar;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.models.Car;
import com.crystal.ovs.services.CarService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/car")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class CarController {
    private final CarService carService;

    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping(path = "{id}")
    public Car getCarById(@PathVariable Long id) {
        return carService.getCarById(id);
    }

    @PostMapping
    public Response<Car> insertCar(@RequestBody DtoCar dtoCar,
                                   HttpServletResponse httpResponse) {
        Response<Car> response = carService.insertCar(dtoCar);

        if(response.getErrors().size() > 0){
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @PutMapping(path = "{id}")
    public Response<Car> updateCar(@PathVariable Long id,
                                   @RequestBody DtoCar dtoCar,
                                   HttpServletResponse httpResponse) {

        Response<Car> response = carService.updateCar(id, dtoCar);

        if(response.getErrors().size() > 0){
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @DeleteMapping(path = "{id}")
    public Response<String> deleteCar(@PathVariable Long id) {
        return new Response(carService.deleteCar(id));
    }
}
