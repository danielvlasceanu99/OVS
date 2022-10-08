package com.crystal.ovs.services;

import com.crystal.ovs.models.Post;
import com.crystal.ovs.repositories.PostRepository;
import com.crystal.ovs.services.interfaces.PostInterf;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PostServiceImpl implements PostInterf {

    private PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }


    @Override
    public List<Post> searchPost(String query) {
        List<Post> posts = postRepository.searchPost(query);
        return posts;
    }
}
