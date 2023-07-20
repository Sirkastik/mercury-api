const { resourcesRepo } = require("../../repo/resources");

const useAddResource = require("./add-resource");
const useGetResource = require("./get-resource");
const useGetResources = require("./get-resources");
const useUpdateResource = require("./update-resource");
const useDeleteResource = require("./delete-resource");

const addResource = useAddResource({ resourcesRepo });
const getResource = useGetResource({ resourcesRepo });
const getResources = useGetResources({ resourcesRepo });
const updateResource = useUpdateResource({ resourcesRepo });
const deleteResource = useDeleteResource({ resourcesRepo });

const resourceService = Object.freeze({
  addResource,
  getResource,
  getResources,
  updateResource,
  deleteResource,
});

module.exports = resourceService;
