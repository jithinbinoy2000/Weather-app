 "use client";
// /page.js
import Dashboard from "./Dashboard/page";
import StoreProvider from "./StoreProvider";


export default function Home() {
 

  return (
    <>
      <div>
        <StoreProvider>
        <Dashboard/>
        </StoreProvider>
     
      </div>
    </>
  );
}
