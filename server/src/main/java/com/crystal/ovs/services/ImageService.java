package com.crystal.ovs.services;

import com.crystal.ovs.dto.DtoImage;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.exceptions.ImageNotFoundException;
import com.crystal.ovs.models.Image;
import com.crystal.ovs.repositories.ImageRepository;
import com.crystal.ovs.repositories.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final PostRepository postRepository;

    public List<Image> getAllImages() {
        return this.imageRepository.findAll();
    }

    public Image getImageById(Integer id) {
        return imageRepository
                .findById(id)
                .orElseThrow(ImageNotFoundException::new);
    }

    public Response<Image> insertImage(DtoImage dtoImage) {
        Response<Image> response = new Response<>();
        response.setErrors(validate(dtoImage));

        if (response.getErrors().size() == 0) {
            Image image = new Image();
            image.setFields(dtoImage);
            response.setResponseBody(imageRepository.save(image));
        }

        return response;
    }

    @Transactional
    public Response<Image> updateImage(Integer id, DtoImage dtoImage) {
        Response<Image> response = new Response<>();
        response.setErrors(validate(dtoImage));

        Image image = imageRepository
                .findById(id)
                .orElseThrow(ImageNotFoundException::new);

        if (response.getErrors().size() == 0) {
            image.setFields(dtoImage);
            response.setResponseBody(image);
        }

        return response;
    }

    public String deleteImage(Integer id) {
        if (!imageRepository.existsById(id)) {
            throw new ImageNotFoundException();
        }

        imageRepository.deleteById(id);
        return "Image removed";
    }

    private List<String> validate(DtoImage dtoImage) {
        List<String> validationErrors = new ArrayList<>();

        if (dtoImage.getImageUrl().isEmpty()) {
            validationErrors.add("Missing image url");
        }
        if(dtoImage.getPostId() == null){
            validationErrors.add("Missing post id");
        } else if(!postRepository.existsById(dtoImage.getPostId())){
            validationErrors.add("There is no post with this id");
        } else {
            dtoImage.setPost(postRepository.findById(dtoImage.getPostId()).get());
        }


        return validationErrors;
    }


}
