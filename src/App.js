import React  from "react";
import {Signup , Login , Feed , PrivateRoute , Profile} from './Components' ;
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/Context/AuthContext";
class App extends React.Component{
   
    render(){
        return (
            <>
               <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path="/login" element={<Login />}/>
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
                            <Route path="/feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
                            <Route path="/" element={<Login />} />
                        </Routes>
                    </AuthProvider>
               </BrowserRouter>
            </>
        )
    }
}

export default App ;