package com.crystal.ovs.services;

import com.crystal.ovs.dto.DtoPost;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.exceptions.PostNotFoundException;
import com.crystal.ovs.models.Post;
import com.crystal.ovs.repositories.CarRepository;
import com.crystal.ovs.repositories.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {

    public static final int SEARCH_RESULT_PER_PAGE = 10;

    @Autowired
    private final PostRepository postRepository;

    private final CarRepository carRepository;

    public Slice<Post> getAllPosts(Integer pageNo) {
        if( pageNo <0){
            throw new PostNotFoundException();
        }
        return postRepository.findBy(PageRequest.of(pageNo, 9));
    }

    public List<Post> getFilteredPosts(Integer pageNo, String query){
        return postRepository.searchPostWithPage(query, PageRequest.of(pageNo, 9));
    }
          
    public List<Post> getAllPosts(){
        return this.postRepository.findAll();
    }

    public Integer getPostCount() {
        return Math.toIntExact(postRepository.count());
    }

    public Integer getFilteredPostCount(String query){
        return Math.toIntExact(postRepository.getPostCount(query));
    }

    public Post getPostById(Integer id) {
        return postRepository
                .findById(id)
                .orElseThrow(PostNotFoundException::new);
    }

    public Response<Post> insertPost(DtoPost dtoPost) {
        Response<Post> response = new Response<>();
        response.setErrors(validate(dtoPost));

        if (dtoPost.getCarId() != null &&
                postRepository.getPostByCarId(dtoPost.getCarId()).isPresent()) {
            response.getErrors().add("There is already a post for thi car");
        }
        if (response.getErrors().size() == 0) {
            Post post = new Post();
            post.setFields(dtoPost);
            response.setResponseBody(postRepository.save(post));
        }

        return response;
    }

    @Transactional
    public Response<Post> updatePost(Integer id, DtoPost dtoPost) {
        Response<Post> response = new Response<>();
        response.setErrors(validate(dtoPost));

        Post post = postRepository
                .findById(id)
                .orElseThrow(PostNotFoundException::new);

        if (dtoPost.getCarId() != null) {
            Optional<Post> postOptional = postRepository.getPostByCarId(dtoPost.getCarId());
            if (postOptional.isPresent() && !Objects.equals(postOptional.get().getId(), post.getId())) {
                response.getErrors().add("There is already a post for this car");
            }
        }
        if (response.getErrors().size() == 0) {
            post.setFields(dtoPost);
            response.setResponseBody(post);
        }

        return response;
    }

    public String deletePost(Integer id) {
        if (!postRepository.existsById(id)) {
            throw new PostNotFoundException();
        }

        postRepository.deleteById(id);
        return "Post removed";
    }

    private List<String> validate(DtoPost dtoPost) {
        List<String> validationErrors = new ArrayList<>();

        if (dtoPost.getTitle().isEmpty()) {
            validationErrors.add("Missing title");
        }
        if (dtoPost.getDescription().isEmpty()) {
            validationErrors.add("Missing description");
        }

        if (dtoPost.getPrice() == null) {
            validationErrors.add("Missing price");
        } else if (dtoPost.getPrice() <= 0) {
            validationErrors.add("Price can't be lower than zero");
        } else if (dtoPost.getPrice() > 5000000) {
            validationErrors.add("Price can't be grater than 5000000");
        }

        if (dtoPost.getCarId() == null) {
            validationErrors.add("Missing car id");
        } else if (!carRepository.existsById(dtoPost.getCarId())) {
            validationErrors.add("There is no car with this id");
        } else {
            dtoPost.setCar(carRepository.findById(dtoPost.getCarId()).get());
        }

        return validationErrors;
    }


}
