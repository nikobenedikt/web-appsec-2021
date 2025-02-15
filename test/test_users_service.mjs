import UsersStorageMemory from './../models/users_storage_memory.mjs';
import UsersService from '../services/users_service.mjs';
import assert from "assert";

describe("The UsersService", async function() {
    it("should create an user and return the corresponding user object", async function() {
        const storage = new UsersStorageMemory();
        const service = await UsersService.createUsersService(storage);

        const email = "andreas@offensive.one";
        const password = "toomanysecrets";

        const theUser = await service.registerUser(email, password);
        assert(theUser.email === email);
        assert(theUser.password_hash !== password);
    });

    it("should allow a valid user to login again", async function() {
        const storage = new UsersStorageMemory();
        const service = await UsersService.createUsersService(storage);

        const email = "andreas@offensive.one";
        const password = "toomanysecrets";

        const theUser = await service.registerUser(email, password);
        const loggedInUser = await service.loginUser(email, password);

        assert(loggedInUser);
        assert(loggedInUser.email === email);
        assert(theUser.id === loggedInUser.id);
    });

    it("should not allow an invalid user with a wrong password to login", async function() {
        const storage = new UsersStorageMemory();
        const service = await UsersService.createUsersService(storage);

        const email = "andreas@offensive.one";
        const password = "toomanysecrets";

        const theUser = await service.registerUser(email, password);
        const loggedInUser = await service.loginUser(email, password + "abc");

        assert(loggedInUser === null);
    });

    it("should not allow an invalid user with a wrong username to login", async function() {
        const storage = new UsersStorageMemory();
        const service = await UsersService.createUsersService(storage);

        const email = "andreas@offensive.one";
        const password = "toomanysecrets";

        const theUser = await service.registerUser(email, password);
        const loggedInUser = await service.loginUser("abc" + email, password);

        assert(loggedInUser === null);
    });

    it("should allow retrieved of users by id", async function() {
        const storage = new UsersStorageMemory();
        const service = await UsersService.createUsersService(storage);

        const email = "andreas@offensive.one";
        const password = "toomanysecrets";

        const theUser = await service.registerUser(email, password);
        const loggedInUser = await service.getUser(theUser.id);

        assert(theUser.id === loggedInUser.id);
        assert(theUser.email === loggedInUser.email);
    });
});