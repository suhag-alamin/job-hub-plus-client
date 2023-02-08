import storage from "redux-persist/lib/storage";

const jobPersistConfig = {
  key: "job",
  storage,
};

export default jobPersistConfig;
