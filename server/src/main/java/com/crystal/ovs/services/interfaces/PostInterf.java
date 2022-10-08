package com.crystal.ovs.services.interfaces;

import com.crystal.ovs.models.Post;

import java.util.List;

public interface PostInterf {
    List<Post> searchPost(String query) ;
}
