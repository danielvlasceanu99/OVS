package com.crystal.ovs.services;

import com.crystal.ovs.dto.DtoEngine;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.exceptions.EngineNotFoundException;
import com.crystal.ovs.models.Engine;
import com.crystal.ovs.repositories.ElectricEngineRepository;
import com.crystal.ovs.repositories.EngineRepository;
import com.crystal.ovs.repositories.FuelEngineRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class EngineService {
    private final EngineRepository engineRepository;
    private final ElectricEngineRepository electricEngineRepository;
    private final FuelEngineRepository fuelEngineRepository;

    public List<Engine> getAllEngines() {
        return this.engineRepository.findAll();
    }

    public Engine getEngineById(Integer id) {
        return engineRepository
                .findById(id)
                .orElseThrow(EngineNotFoundException::new);
    }

    public Response<Engine> insertEngine(DtoEngine dtoEngine) {
        Response<Engine> response = new Response<>();
        response.setErrors(validate(dtoEngine));

        if (response.getErrors().size() == 0) {
            Engine engine = new Engine();
            engine.setFields(dtoEngine);
            response.setResponseBody(engineRepository.save(engine));
        }

        return response;
    }

    @Transactional
    public Response<Engine> updateEngine(Integer id, DtoEngine dtoEngine) {
        Response<Engine> response = new Response<>();
        response.setErrors(validate(dtoEngine));

        Engine engine = engineRepository
                .findById(id)
                .orElseThrow(EngineNotFoundException::new);

        if (response.getErrors().size() == 0) {
            engine.setFields(dtoEngine);
            response.setResponseBody(engine);
        }

        return response;
    }

    public String deleteEngine(Integer id) {
        if (!engineRepository.existsById(id)) {
            throw new EngineNotFoundException();
        }

        engineRepository.deleteById(id);
        return "Engine removed";
    }
    private List<String> validate(DtoEngine dtoEngine) {
        List<String> validationErrors = new ArrayList<>();

        if(dtoEngine.getElectricEngineId() == null &&
                dtoEngine.getFuelEngineId() == null){
            validationErrors.add("Missing electric engine  id or fuel engine id");
        } else {
            if(dtoEngine.getElectricEngineId() != null){
                if(electricEngineRepository.existsById(dtoEngine.getElectricEngineId())){
                    dtoEngine
                            .setElectricEngine(electricEngineRepository
                                    .findById(dtoEngine.getElectricEngineId()).get());
                } else {
                    validationErrors.add("There is no electric engine with this id");
                }
            }
            if(dtoEngine.getFuelEngineId() != null){
                if(fuelEngineRepository.existsById(dtoEngine.getFuelEngineId())){
                    dtoEngine
                            .setFuelEngine(fuelEngineRepository
                                    .findById(dtoEngine.getFuelEngineId()).get());
                } else {
                    validationErrors.add("There is no fuel engine with this id");
                }
            }
        }
        if(dtoEngine.getHorsePower() <= 50){
            validationErrors.add("Horsepower can't be lower than 50");
        } else if (dtoEngine.getHorsePower() > 1500){
            validationErrors.add("Horsepower must be below 1500");
        }

        if(dtoEngine.getTorque() <= 40){
            validationErrors.add("Torque can't be lower than 40");
        } else if (dtoEngine.getTorque() > 1500){
            validationErrors.add("Torque must be below 1500");
        }

        return validationErrors;
    }

}
