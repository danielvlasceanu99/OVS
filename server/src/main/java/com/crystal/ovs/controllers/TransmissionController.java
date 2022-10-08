package com.crystal.ovs.controllers;


import com.crystal.ovs.dto.DtoTransmission;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.models.Transmission;
import com.crystal.ovs.services.TransmissionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/transmission")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class TransmissionController {
    private final TransmissionService transmissionService;

    @GetMapping
    public List<Transmission> getAllTransmissions(){
        return transmissionService.getAllTransmissions();
    }

    @GetMapping(path = "{id}")
    public Transmission getTransmissionById(@PathVariable Long id){
        return transmissionService.getTransmissionById(id);
    }

    @PostMapping
    public Response<Transmission> insertTransmission(@RequestBody DtoTransmission dtoTransmission, HttpServletResponse httpResponse){
        Response<Transmission> response = transmissionService.insertTransmission(dtoTransmission);
        if(response.getErrors().size() > 0){
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @PutMapping(path = "{id}")
    public Response<Transmission> updateTransmission(@PathVariable Long id, @RequestBody DtoTransmission dtoTransmission, HttpServletResponse httpResponse){
        Response<Transmission> response = transmissionService.updateTransmission(id, dtoTransmission);
        if(response.getErrors().size() > 0){
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @DeleteMapping(path = "{id}")
    public Response<String> deleteTransmission(@PathVariable Long id){
        return new Response<>(transmissionService.deleteTransmission(id));
    }
}
