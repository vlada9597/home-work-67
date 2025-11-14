import express from "express";

const router = express.Router();
let db = null;

export function initUserRoutes(database) {
    db = database;
    return router;
}

/* --------------------------------------------
   POST /users/add — додати користувача
--------------------------------------------- */

router.post("/add", async (req, res) => {
    try {
        const { name, age } = req.body;

        if (!name || !age) {
            return res.status(400).json({ error: "Name and age are required" });
        }

        await db.collection("users").insertOne({ name, age });

        res.json({ message: "User added" });
    } catch (err) {
        res.status(500).json({ error: "Insert error", details: err });
    }
});

/* --------------------------------------------
   GET /users/cursor — повернення даних курсором
--------------------------------------------- */

router.get("/cursor", async (req, res) => {
    try {
        const cursor = db.collection("users").find({});

        const result = [];

        for await (const doc of cursor) {
            result.push(doc);
        }

        res.json({
            count: result.length,
            data: result
        });
    } catch (err) {
        res.status(500).json({ error: "Cursor error", details: err });
    }
});

/* -------------------------------------------------------
   GET /users/stats — агрегація (кількість, мін/макс/ср. вік)
-------------------------------------------------------- */

router.get("/stats", async (req, res) => {
    try {
        const stats = await db.collection("users").aggregate([
            {
                $group: {
                    _id: null,
                    totalUsers: { $count: {} },
                    avgAge: { $avg: "$age" },
                    minAge: { $min: "$age" },
                    maxAge: { $max: "$age" }
                }
            }
        ]).toArray();

        res.json(stats[0]);
    } catch (err) {
        res.status(500).json({ error: "Aggregation error", details: err });
    }
});

export default router;
