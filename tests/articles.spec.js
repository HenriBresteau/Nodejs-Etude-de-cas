const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const User = require("../api/users/users.model");
const userService = require("../api/users/users.service");
const Article = require("../api/articles/articles.schema");
const articlesService = require("../api/articles/articles.service");

describe("Tester l'API des articles", () => {
    let token;
    const USER_ID = "fake";
    const MOCK_USER = {
        _id: USER_ID,
        name: "ana",
        email: "nfegeg@gmail.com",
        password: "azertyuiop",
        role: "admin",
    };
    const MOCK_ARTICLE_CREATED = {
        title: "Titre de l'article",
        content: "Contenu de l'article",
        status: "draft",
    };
    const MOCK_ARTICLE_UPDATE = {
        _id: "66195c8b3b9b4270f57817d5",
        title: "Nouveau titre",
        content: "Nouveau contenu",
    };

    beforeEach(() => {
        token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
        mockingoose(User).toReturn(MOCK_USER, "findOne");
        mockingoose(Article).toReturn(MOCK_ARTICLE_CREATED, "save");
        mockingoose(Article).toReturn(MOCK_ARTICLE_UPDATE, "findOneAndUpdate");
        mockingoose(Article).toReturn({}, "deleteOne");
    });

    test("[Articles] Créer un article", async () => {
        const res = await request(app)
            .post("/api/articles")
            .set("x-access-token", token)
            .send(MOCK_ARTICLE_CREATED);

        expect(res.status).toBe(201);
        expect(res.body.title).toBe(MOCK_ARTICLE_CREATED.title);
        expect(res.body.content).toBe(MOCK_ARTICLE_CREATED.content);
    });

    test("[Articles] Mettre à jour un article", async () => {
        const res = await request(app)
            .put(`/api/articles/66195c8b3b9b4270f57817d5`)
            .set("x-access-token", token)
            .send({ title: "Nouveau titre", content: "Nouveau contenu" });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe("Nouveau titre");
        expect(res.body.content).toBe("Nouveau contenu");
    });

    test("[Articles] Supprimer un article", async () => {
        const res = await request(app)
            .delete(`/api/articles/66195c8b3b9b4270f57817d5`)
            .set("x-access-token", token);
        expect(res.status).toBe(204);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
