package com.crystal.ovs.services;

import com.crystal.ovs.dto.DtoFuelEngine;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.exceptions.FuelEngineNotFoundException;
import com.crystal.ovs.models.FuelEngine;
import com.crystal.ovs.repositories.FuelEngineRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FuelEngineService {
    private final FuelEngineRepository fuelEngineRepository;

    public List<FuelEngine> getAllFuelEngines(){
        return this.fuelEngineRepository.findAll();
    }

    public FuelEngine getFuelEngineById(Long id){
        return fuelEngineRepository
                .findById(id)
                .orElseThrow(FuelEngineNotFoundException::new);
    }

    public Response<FuelEngine> insertFuelEngine(DtoFuelEngine dtoFuelEngine){
        Response<FuelEngine> response = new Response<>();
        response.setErrors(validate(dtoFuelEngine));

        if(response.getErrors().size() == 0){
            FuelEngine fuelEngine = new FuelEngine();
            fuelEngine.setFields(dtoFuelEngine);
            response.setResponseBody(fuelEngineRepository.save(fuelEngine));
        }

        return response;
    }

    @Transactional
    public Response<FuelEngine> updateFuelEngine(Long id, DtoFuelEngine dtoFuelEngine){
        Response<FuelEngine> response = new Response<>();
        response.setErrors(validate(dtoFuelEngine));

        FuelEngine fuelEngine = fuelEngineRepository
                .findById(id)
                .orElseThrow(FuelEngineNotFoundException::new);

        if(response.getErrors().size() == 0){
            fuelEngine.setFields(dtoFuelEngine);
            response.setResponseBody(fuelEngine);
        }

        return response;
    }

    public String deleteFuelEngine(Long id){
        if(!fuelEngineRepository.existsById(id)){
            throw new FuelEngineNotFoundException();
        }

        fuelEngineRepository.deleteById(id);
        return"Fuel engine removed";
    }

    private List<String> validate(DtoFuelEngine dtoFuelEngine) {
        List<String> validationErrors = new ArrayList<>();

        if(dtoFuelEngine.getFuelConsumption() == null){
            validationErrors.add("Missing fuel consumption");
        } else if(dtoFuelEngine.getFuelConsumption() <= 0){
            validationErrors.add("Fuel consumption can't be lower than zero");
        } else if (dtoFuelEngine.getFuelConsumption() > 40){
            validationErrors.add("Fuel consumption must be below 40");
        }

        if(dtoFuelEngine.getCo2Emissions() == null){
            validationErrors.add("Missing CO2 emissions");
        } else if(dtoFuelEngine.getCo2Emissions() <= 0){
            validationErrors.add("CO2 emissions can't be lower than zero");
        } else if(dtoFuelEngine.getCo2Emissions() > 250){
            validationErrors.add("CO2 emissions can't be grater than 250");
        }

        if(dtoFuelEngine.getDisplacement() == null){
            validationErrors.add("Missing displacement");
        } else if(dtoFuelEngine.getDisplacement() <= 0){
            validationErrors.add("Displacement can't be lower than zero");
        }else if(dtoFuelEngine.getDisplacement() > 9){
            validationErrors.add("Displacement must be lower than 9.0");
        }

        if(dtoFuelEngine.getNumberOfCylinders() == null){
            validationErrors.add("Missing number of cylinders");
        } else if(dtoFuelEngine.getNumberOfCylinders() <= 0){
            validationErrors.add("Number of cylinders can't be lower than zero");
        } else if(dtoFuelEngine.getNumberOfCylinders() > 16){
            validationErrors.add("Number of cylinders must be 16 or less");
        }

        if(dtoFuelEngine.getFuelType() == null){
            validationErrors.add("Missing fuel type");
        }
        if(dtoFuelEngine.getEngineLayout() == null){
            validationErrors.add("Missing engine layout");
        }
        if(dtoFuelEngine.getStrokeType() == null){
            validationErrors.add("Missing stroke type");
        }

        if(dtoFuelEngine.getHasTurbine() == null){
            validationErrors.add("Missing has turbine");
        }
        if(dtoFuelEngine.getHasSupercharge() == null){
            validationErrors.add("Missing has supercharge");
        }

        return validationErrors;
    }
}
