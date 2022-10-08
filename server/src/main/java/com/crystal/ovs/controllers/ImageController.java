package com.crystal.ovs.controllers;

import com.crystal.ovs.dto.DtoImage;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.models.Image;
import com.crystal.ovs.services.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/image")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class ImageController {
    private final ImageService imageService;

    @GetMapping
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }

    @GetMapping(path = "{id}")
    public Image getImageById(@PathVariable Integer id) {
        return imageService.getImageById(id);
    }

    @PostMapping
    public Response<Image> insertImage(@RequestBody DtoImage dtoImage,
                                       HttpServletResponse httpResponse) {
        Response<Image> response = imageService.insertImage(dtoImage);

        if (response.getErrors().size() > 0) {
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @PutMapping(path = "{id}")
    public Response<Image> updateImage(@PathVariable Integer id,
                                       @RequestBody DtoImage dtoImage,
                                       HttpServletResponse httpResponse) {

        Response<Image> response = imageService.updateImage(id, dtoImage);

        if (response.getErrors().size() > 0) {
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @DeleteMapping(path = "{id}")
    public Response<String> deleteImage(@PathVariable Integer id) {
        return new Response<>(imageService.deleteImage(id));
    }

}
