module.exports = useGetResources;

function useGetResources({ resourcesRepo }) {
  return async function getResources() {
    return await resourcesRepo.findAll();
  };
}
