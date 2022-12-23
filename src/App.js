// in src/admin/index.tsx
import { Admin, Resource, ListGuesser, Layout, Datagrid, TextField, List, TopToolbar, Button } from "react-admin";
//import jsonServerProvider from "ra-data-json-server";

import { MyError } from "./error";

//const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

import dataProvider from './providers/dataprovider';

const MyLayout = (props) => <Layout
    {...props}
    error={MyError}
/>;

const ListApiError = (props) => {
  return (<List>
        <Datagrid>
            <TextField source="id" />
        </Datagrid>
    </List>);
}

const ListUncaughtError = (props) => {
  const ListActions = () => (
      <TopToolbar>
          <Button
              onClick={() => { throw new Error('💥 CABOOM 💥'); }}
              label="💥 CABOOM 💥"
          >
          </Button>
      </TopToolbar>
  );

  return <ListGuesser {...props} actions={<ListActions />} />;
}

const ListRuntimeError = (props) => {
  return <ListGuesser {...props} actions={"RunTimeErrorString"} />;
}

const App = () => (
  <Admin layout={MyLayout} dataProvider={dataProvider}>
    <Resource name="posts" list={ListGuesser} />
    <Resource name="comments" options={{label:'Uncaught error'}} list={ListUncaughtError} />
    <Resource name="api_error" list={ListApiError} />
    <Resource name="users" options={{label:'Runtime error'}} list={ListRuntimeError} />
  </Admin>
);

export default App;
