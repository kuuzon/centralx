import cgApi from "../services/cgApi";

// GET LIST (limited to top 20 by mkt cap)
function getList(){
  return cgApi.get("/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1");
}

// GET BY ID
function getById(id){
  const endpoint = cgApi.baseURL + "/coins/" + id;
  console.log(endpoint)
  return cgApi.get("/coins/" + id);
}

const cgService = {
  getList,
  getById,
}

export default cgService;