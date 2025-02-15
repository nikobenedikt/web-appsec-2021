import PostsService from './../services/posts_service.mjs';
import PostsStorageMemory from './../models/posts_storage_memory.mjs';
import assert from "assert";

describe("the PostsService should", function() {
    it("should be able to add a post and the post should be returned", function() {
        let storage = new PostsStorageMemory();
        let posts = new PostsService(storage);

        const title = "the title";
        const author = "andy";
        const content = "the content";

        const added = posts.addPost(title, author, content);
        assert(added.title === title);
        assert(added.content === content);
        assert(added.author === author);
    });

    it("should be able to add a post and the post should be able to be retrieved", function() {
        let storage = new PostsStorageMemory();
        let posts = new PostsService(storage);

        const title = "the title";
        const author = "andy";
        const content = "the content";

        const tmp = posts.addPost(title, author, content);

        const added = posts.getPost(tmp.id);
        assert(added.id === tmp.id);
        assert(added.title === title);
        assert(added.content === content);
        assert(added.author === author);
    });

    it("should be able to add a post and the list should contain the post", function() {
        let storage = new PostsStorageMemory();
        let posts = new PostsService(storage);

        const title = "the title";
        const author = "andy";
        const content = "the content";

        assert(posts.listPosts().length === 0);
        posts.addPost(title, author, content);
        const all = posts.listPosts();

        assert(all.length===1);

        const added = all[0];
        assert(added.title === title);
        assert(added.content === content);
        assert(added.author === author);
    });
});