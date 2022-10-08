package com.crystal.ovs.services;

import com.crystal.ovs.dto.DtoTransmission;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.exceptions.TransmissionNotFoundException;
import com.crystal.ovs.models.Transmission;
import com.crystal.ovs.repositories.TransmissionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class TransmissionService {
    private final TransmissionRepository transmissionRepository;

    public List<Transmission> getAllTransmissions(){
        return this.transmissionRepository.findAll();
    }

    public Transmission getTransmissionById(Long id){
        return transmissionRepository
                .findById(id)
                .orElseThrow(TransmissionNotFoundException::new);
    }

    public Response<Transmission> insertTransmission(DtoTransmission dtoTransmission){
        Response<Transmission> response = new Response<>();
        response.setErrors(validate(dtoTransmission));

        if(response.getErrors().size() == 0){
            Transmission transmission = new Transmission();
            transmission.setFields(dtoTransmission);
            response.setResponseBody(transmissionRepository.save(transmission));
        }

        return response;
    }

    @Transactional
    public Response<Transmission> updateTransmission(Long id, DtoTransmission dtoTransmission){
        Response<Transmission> response = new Response<>();
        response.setErrors(validate(dtoTransmission));

        Transmission transmission = transmissionRepository
                .findById(id)
                .orElseThrow(TransmissionNotFoundException::new);

        if(response.getErrors().size() == 0){
            transmission.setFields(dtoTransmission);
            response.setResponseBody(transmission);
        }

        return response;
    }


    public String deleteTransmission(Long id){
        if(!transmissionRepository.existsById(id)){
            throw new TransmissionNotFoundException();
        }

        transmissionRepository.deleteById(id);
        return"Transmission removed";
    }

    private List<String> validate(DtoTransmission dtoTransmission) {
        List<String> validationErrors = new ArrayList<>();

        if(dtoTransmission.getNumberOfGears() < 1 || dtoTransmission.getNumberOfGears() > 15){
            validationErrors.add("ERROR: A transmission can't have more than 15 gears and less than 1");
        }
        return validationErrors;
    }

}
