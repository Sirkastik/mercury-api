const Id = require("@paralleldrive/cuid2");
const useCreateResource = require("./create-resource");
const useCreateField = require("./create-field");

const createField = useCreateField({ Id });

const createResource = useCreateResource({ Id, createField });

module.exports = createResource;
