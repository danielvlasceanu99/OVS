package com.crystal.ovs.controllers;

import com.crystal.ovs.dto.DtoFuelEngine;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.models.FuelEngine;
import com.crystal.ovs.services.FuelEngineService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/fuel-engine")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class FuelEngineController {
    private final FuelEngineService fuelEngineService;

    @GetMapping
    public List<FuelEngine> getAllFuelEngines(){
        return fuelEngineService.getAllFuelEngines();
    }

    @GetMapping(path = "{id}")
    public FuelEngine getFuelEngineById(@PathVariable Long id){
        return fuelEngineService.getFuelEngineById(id);
    }

    @PostMapping
    public Response<FuelEngine> insertFuelEngine(@RequestBody DtoFuelEngine dtoFuelEngine,
                                                 HttpServletResponse httpResponse){
        Response<FuelEngine> response = fuelEngineService.insertFuelEngine(dtoFuelEngine);

        if(response.getErrors().size() > 0){
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @PutMapping(path = "{id}")
    public Response<FuelEngine> updateFuelEngine(@PathVariable Long id,
                                                 @RequestBody DtoFuelEngine dtoFuelEngine,
                                                 HttpServletResponse httpResponse){

        Response<FuelEngine> response = fuelEngineService.updateFuelEngine(id, dtoFuelEngine);

        if(response.getErrors().size() > 0){
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @DeleteMapping(path = "{id}")
    public Response<String> deleteFuelEngine(@PathVariable Long id){
        return new Response<>(fuelEngineService.deleteFuelEngine(id));
    }
}
