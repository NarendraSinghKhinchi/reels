import {useState ,useContext} from 'react';
import {Card,Alert, CardContent,CardActions, TextField, Typography,Button,} from '@mui/material' ;
import styles from './Signup.module.css' ;
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link , useNavigate} from 'react-router-dom' ;
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../fireBase/firebase';
const Signup = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [file,setFile] = useState(null);
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {signup} = useContext(AuthContext);

    const handleSignUp = async()=>{
        if(file == null){
            setError("please upload profile image first");
            setTimeout(()=>{
                setError('');
            },5000);
            return ;
        }
        try{
            setError('');
            setLoading(true);
            let usrobj = await signup(email , password);
            let uid = usrobj.user.uid ;
            let uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed', fn1 , fn2 , fn3);
            function fn1(snapshot){
                let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100 ;
                console.log(`upload is ${progress} done`);
            }
            function fn2(error){
                setError("error occured please open console to know more");
                console.log(error);
                setTimeout(()=>{
                    setError('');
                },5000);
                return ;
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    // console.log(url);
                    database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        fullName:name,
                        profileUrl:url,
                        createdAt:database.getTimeStamp 
                    })
                    navigate('/');
                })
                setLoading(false);
            }
        }
        catch(err){
            setLoading(false);
            setError("error occured please open console to know more");
            console.log(err);
            setTimeout(()=>{
                setError('');
            },5000);
            return ;
        }
    }
    return (
    <div className={styles.SignupBody}>
        <div className={styles.signupWrapper}>
            <Card variant="outlined" className={styles.signupCard}>
                <CardContent>
                    <Typography variant='h2' style={{fontFamily:'Cedarville Cursive'}} >Instagram</Typography>
                    <Typography variant='text1' color="text.secondary" gutterBottom>Sign up to see photos and videos from your friends</Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField fullWidth label="Email" margin="dense" size='small' value={email} onChange={(e)=>setEmail(e.target.value)}></TextField>
                    <TextField fullWidth label="Password" margin="dense" size='small' value={password} onChange={(e)=>setPassword(e.target.value)}></TextField>
                    <TextField fullWidth label="FullName" margin="dense" size='small' value={name} onChange={(e)=>setName(e.target.value)}></TextField>
                    <Button color="secondary" fullWidth variant='outlined' startIcon={<CloudUploadIcon />} component='label'>
                        UPLOAD PROFILE IMAGE
                        <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}></input>
                    </Button>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant="contained" margin="dense" disabled={loading} onClick={handleSignUp}>Sign up</Button>
                </CardActions>
                <CardContent>
                    <Typography variant="text1" color="text.secondary" gutterBottom>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</Typography>
                </CardContent>

                <Card variant="outlined" className={styles.card2}>
                    <CardContent className={styles.cardCont} >
                        <Typography >
                            already have an account ? <Link to="/" style={{textDecoration:"none"}} >Sign in</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Card>
        </div>
    </div>
    );
}

export default Signup ;