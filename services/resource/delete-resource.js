module.exports = useGetResource;

function useGetResource({ resourcesRepo }) {
  return async function getResource(id) {
    return resourcesRepo.remove(id)
  };
}
