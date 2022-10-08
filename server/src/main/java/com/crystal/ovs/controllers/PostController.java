package com.crystal.ovs.controllers;

import com.crystal.ovs.dto.DtoPost;
import com.crystal.ovs.dto.PaginationResponse;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.models.Post;
import com.crystal.ovs.services.interfaces.PostInterf;
import com.crystal.ovs.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/post")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class PostController {
    private final PostService postService;
    @Autowired
    private final PostInterf postInterf;

    @GetMapping(path = "/get")
    public List<Post> getPosts() {
        return this.postService.getAllPosts();
    }

    @GetMapping
    public ResponseEntity<Slice<Post>> getAllPosts(@RequestParam(defaultValue = "0") Integer pageNo) {
        Slice<Post> list = postService.getAllPosts(pageNo);
        return new ResponseEntity<Slice<Post>>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping(path = "/element")
    public Integer getCountPost() {
        return postService.getPostCount();
    }

    @GetMapping("/search")
    public ResponseEntity<PaginationResponse<Post>> searchPost(@RequestParam(defaultValue = "0") Integer pageNo,
                                                 @RequestParam("query") String query) {
        return ResponseEntity.ok(new PaginationResponse<Post>(postService.getFilteredPostCount(query),
                postService.getFilteredPosts(pageNo,query)));
    }

    @GetMapping(path = "{id}")
    public Post getPostById(@PathVariable Integer id) {
        return postService.getPostById(id);
    }

    @PostMapping
    public Response<Post> insertPost(@RequestBody DtoPost dtoPost,
                                     HttpServletResponse httpResponse) {
        Response<Post> response = postService.insertPost(dtoPost);

        if (response.getErrors().size() > 0) {
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @PutMapping(path = "{id}")
    public Response<Post> updatePost(@PathVariable Integer id,
                                     @RequestBody DtoPost dtoPost,
                                     HttpServletResponse httpResponse) {

        Response<Post> response = postService.updatePost(id, dtoPost);

        if (response.getErrors().size() > 0) {
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @DeleteMapping(path = "{id}")
    public Response<String> deletePost(@PathVariable Integer id) {
        return new Response<>(postService.deletePost(id));
    }
}
