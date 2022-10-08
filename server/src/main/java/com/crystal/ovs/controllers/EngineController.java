package com.crystal.ovs.controllers;

import com.crystal.ovs.dto.DtoEngine;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.models.Engine;
import com.crystal.ovs.services.EngineService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/engine")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class EngineController {
    private final EngineService engineService;

    @GetMapping
    public List<Engine> getAllEngines() {

        return engineService.getAllEngines();
    }

    @GetMapping(path = "{id}")
    public Engine getEngineById(@PathVariable Integer id) {
        return engineService.getEngineById(id);
    }


    @PutMapping(path = "{id}")
    public Response<Engine> updateEngine(@PathVariable Integer id,
                                         @RequestBody DtoEngine dtoEngine,
                                         HttpServletResponse httpResponse) {

        Response<Engine> response = engineService.updateEngine(id, dtoEngine);

        if (response.getErrors().size() > 0) {
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @PostMapping
    public Response<Engine> insertEngine(@RequestBody DtoEngine dtoEngine,
                                         HttpServletResponse httpResponse) {
        Response<Engine> response = engineService.insertEngine(dtoEngine);

        if (response.getErrors().size() > 0) {
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }


    @DeleteMapping(path = "{id}")
    public Response<String> deleteEngine(@PathVariable Integer id) {
        return new Response<>(engineService.deleteEngine(id));
    }

}

