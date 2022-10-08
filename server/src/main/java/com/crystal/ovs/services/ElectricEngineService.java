package com.crystal.ovs.services;

import com.crystal.ovs.dto.DtoElectricEngine;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.exceptions.ElectricEngineNotFoundException;
import com.crystal.ovs.models.ElectricEngine;
import com.crystal.ovs.repositories.ElectricEngineRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ElectricEngineService {
    private final ElectricEngineRepository electricEngineRepository;

    public List<ElectricEngine> getAllElectricEngines() {
        return electricEngineRepository.findAll();
    }

    public ElectricEngine getElectricEngineById(Long id) {
        return electricEngineRepository
                .findById(id)
                .orElseThrow(ElectricEngineNotFoundException::new);
    }

    public Response<ElectricEngine> insertElectricEngine(DtoElectricEngine dtoElectricEngine){
        Response<ElectricEngine> response = new Response<>();
        response.setErrors(validate(dtoElectricEngine));

        if(response.getErrors().size() == 0) {
            ElectricEngine electricEngine = new ElectricEngine();
            electricEngine.setFields(dtoElectricEngine);
            response.setResponseBody(electricEngineRepository.save(electricEngine));
        }

        return response;
    }

    @Transactional
    public Response<ElectricEngine> updateElectricEngine(Long id, DtoElectricEngine dtoElectricEngine) {
        Response<ElectricEngine> response = new Response<>();
        response.setErrors(validate(dtoElectricEngine));

        ElectricEngine electricEngine = electricEngineRepository
                .findById(id)
                .orElseThrow(ElectricEngineNotFoundException::new);

        if(response.getErrors().size() == 0){
            electricEngine.setFields(dtoElectricEngine);
            response.setResponseBody(electricEngine);
        }

        return response;
    }

    public String deleteElectricEngine(Long id){
        if(!electricEngineRepository.existsById(id)){
            throw new ElectricEngineNotFoundException();
        }

        electricEngineRepository.deleteById(id);
        return "Electric engine removed";
    }

    private static List<String> validate(DtoElectricEngine dtoElectricEngine) {
        List<String> validationErrors = new ArrayList<>();

        if (dtoElectricEngine.getType().isEmpty()) {
            validationErrors.add("ERROR: Type is empty!");
        }
        if (dtoElectricEngine.getBatteryCapacity() < 17) {
            validationErrors.add("ERROR: Battery capacity is too low for an electric vehicle!");
        }
        if (dtoElectricEngine.getMotor_range() < 135) {
            validationErrors.add("ERROR: Range is too small for a car's electric engine!");
        }

        return validationErrors;
    }
}
