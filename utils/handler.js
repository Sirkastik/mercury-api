const _ = require("lodash");
const { Model } = require("mongoose");

module.exports = {
  postHandler,
  getHandler,
  putHandler,
  deleteHandler,
  getOneHandler,
};

/**
 * A repo is a mongoose model
 * @typedef {Model<any, {}, {}, {}, any, Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, {timestamps: true;}, any, Document<unknown, {}, FlatRecord<any>> & Omit<>>>} Repo
 */

/**
 *
 * @param {Repo} Repo
 * @returns
 */
function postHandler(Repo) {
  return async (req, res) => {
    try {
      const data = await Repo.create(req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}

/**
 *
 * @param {Repo} Repo
 * @returns
 */
function getHandler(Repo) {
  return async (req, res) => {
    const { limit, skip, sort, populate } = _.merge(req.body, req.query);

    try {
      const query = Repo.find();
      sort && query.sort(sort);
      skip && query.skip(skip);
      limit && query.limit(limit);
      populate && query.populate(populate);
      const data = await query.exec();
      res.json(data);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error });
    }
  };
}

/**
 *
 * @param {Repo} Repo
 * @returns
 */
function getOneHandler(Repo) {
  return async (req, res) => {
    const { include } = req.query;

    try {
      const data = await Repo.findById(req.params.id).populate(include).exec();
      res.json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}

/**
 *
 * @param {Repo} Repo
 * @returns
 */
function putHandler(Repo) {
  return async (req, res) => {
    try {
      const data = await Repo.findByIdAndUpdate(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}

/**
 *
 * @param {Repo} Repo
 * @returns
 */
function deleteHandler(Repo) {
  return async (req, res) => {
    try {
      const data = await Repo.findByIdAndDelete(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}
