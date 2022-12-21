// in src/admin/index.tsx
import { Admin, Resource, ListGuesser, Layout } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import { MyError } from "./error";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const MyLayout = (props) => <Layout
    {...props}
    error={MyError}
/>;

const App = () => (
  <Admin layout={MyLayout} dataProvider={dataProvider}>
    <Resource name="posts" list={ListGuesser} />
    <Resource name="comments" list={ListGuesser} />
    <Resource name="error" list={ListGuesser} />
  </Admin>
);

export default App;
