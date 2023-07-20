module.exports = useGetResource;

function useGetResource({ resourcesRepo }) {
  return async function getResource({ id, name }) {
    if (id) return resourcesRepo.findById(id);
    if (name) return resourcesRepo.findByName(name);
  };
}
