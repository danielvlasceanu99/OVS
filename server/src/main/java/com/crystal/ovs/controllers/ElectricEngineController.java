package com.crystal.ovs.controllers;

import com.crystal.ovs.dto.DtoElectricEngine;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.models.ElectricEngine;
import com.crystal.ovs.services.ElectricEngineService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/electric_engine")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class ElectricEngineController {
    private final ElectricEngineService electricEngineService;

    @GetMapping
    public List<ElectricEngine> getAllElectricEngines() {
        return electricEngineService.getAllElectricEngines();
    }

    @GetMapping(path = "{id}")
    public ElectricEngine getElectricEngineById(@PathVariable Long id) {
        return electricEngineService.getElectricEngineById(id);
    }

    @PostMapping
    public Response<ElectricEngine> insertElectricEngine(@RequestBody DtoElectricEngine dtoElectricEngine,
                                              HttpServletResponse httpResponse) {
        Response<ElectricEngine> response = electricEngineService.insertElectricEngine(dtoElectricEngine);

        if(response.getErrors().size() > 0){
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @PutMapping(path = "{id}")
    public Response<ElectricEngine> updateElectricEngine(@PathVariable Long id,
                                   @RequestBody DtoElectricEngine dtoElectricEngine,
                                   HttpServletResponse httpResponse) {

        Response<ElectricEngine> response = electricEngineService.updateElectricEngine(id, dtoElectricEngine);

        if(response.getErrors().size() > 0){
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @DeleteMapping(path = "{id}")
    public Response<String> deleteElectricEngine(@PathVariable Long id) {
        return new Response<>(electricEngineService.deleteElectricEngine(id));
    }
}
