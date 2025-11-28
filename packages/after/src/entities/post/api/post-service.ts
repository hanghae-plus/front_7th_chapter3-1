import { createStorageAdapter } from '@/shared/lib/storage';

import type { Post } from '../model/post-type';
import {
  addNewPost,
  changePostStatus,
  createNewPost,
  createUpdatedPost,
  filterPostById,
  findPostById,
  updatePostInArray,
  validateIsArchived,
  validateNotPublished,
  validatePostExists,
  validatePostTitle,
} from '../lib/post-utils';
import { DEFAULT_POSTS, POST_STATUSES_MAP, POSTS_STORAGE_KEY } from '../config/post-constants';

// Create storage adapter for posts
const postStorage = createStorageAdapter<Post[]>(POSTS_STORAGE_KEY, DEFAULT_POSTS);

export const postService = {
  async getAll(): Promise<Post[]> {
    return postStorage.get();
  },

  async getById(id: number): Promise<Post | null> {
    const posts = postStorage.get();
    return findPostById(posts, id);
  },

  async create(postData: Omit<Post, 'id' | 'createdAt' | 'views'>): Promise<Post> {
    const posts = postStorage.get();

    validatePostTitle(postData.title);

    const newPost = createNewPost(posts, postData);
    const updatedPosts = addNewPost(posts, newPost);

    postStorage.set(updatedPosts);
    return newPost;
  },

  async update({
    id,
    postData,
  }: {
    id: number;
    postData: Partial<Omit<Post, 'id' | 'createdAt' | 'views'>>;
  }): Promise<Post> {
    const posts = postStorage.get();
    const post = findPostById(posts, id);

    validatePostExists(post);

    const updatedPost = createUpdatedPost(post!, postData);
    const updatedPosts = updatePostInArray(posts, updatedPost);

    postStorage.set(updatedPosts);
    return updatedPost;
  },

  async delete(id: number): Promise<void> {
    const posts = postStorage.get();
    const post = findPostById(posts, id);

    validatePostExists(post);

    const filteredPosts = filterPostById(posts, id);
    postStorage.set(filteredPosts);
  },

  async publish(id: number): Promise<Post> {
    const posts = postStorage.get();
    const post = findPostById(posts, id);

    validatePostExists(post);
    validateNotPublished(post!);

    const publishedPost = changePostStatus(post!, POST_STATUSES_MAP.published);
    const updatedPosts = updatePostInArray(posts, publishedPost);

    postStorage.set(updatedPosts);
    return publishedPost;
  },

  async archive(id: number): Promise<Post> {
    const posts = postStorage.get();
    const post = findPostById(posts, id);

    validatePostExists(post);

    const archivedPost = changePostStatus(post!, POST_STATUSES_MAP.archived);
    const updatedPosts = updatePostInArray(posts, archivedPost);

    postStorage.set(updatedPosts);
    return archivedPost;
  },

  async restore(id: number): Promise<Post> {
    const posts = postStorage.get();
    const post = findPostById(posts, id);

    validatePostExists(post);
    validateIsArchived(post!);

    const restoredPost = changePostStatus(post!, POST_STATUSES_MAP.published);
    const updatedPosts = updatePostInArray(posts, restoredPost);

    postStorage.set(updatedPosts);
    return restoredPost;
  },
};
