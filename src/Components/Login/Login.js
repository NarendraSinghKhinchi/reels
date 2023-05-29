import { useContext,useState,} from 'react';
import {Card,Alert, CardContent,CardActions, TextField, Typography,Button,} from '@mui/material' ;
import styles from './Login.module.css' ;
import {Link, useNavigate} from 'react-router-dom' ;
import 'pure-react-carousel/dist/react-carousel.es.css';
import screenshot1 from '../../images/screenshot1.png' ;
import screenshot2 from '../../images/screenshot2.png' ;
import screenshot3 from '../../images/screenshot3.png' ;
import screenshot4 from '../../images/screenshot4.png' ;
import {CarouselProvider, Slider, Slide,Image} from 'pure-react-carousel' ;
import { AuthContext } from '../Context/AuthContext';
const Login = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [error , setError] = useState('');
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const carousel = (
        <CarouselProvider  totalSlides={4} visibleSlides={1} naturalSlideWidth={223} naturalSlideHeight={473} 
            hasMasterSpinner={true} isPlaying={true} infinite={true} dragEnabled={false}
            touchEnabled={false} step={1}
        >
            <Slider interval={5000}>
                <Slide index={0}>
                    <Image src={screenshot1}/>
                </Slide>
                <Slide index={1}>
                    <Image src={screenshot2}/>
                </Slide>
                <Slide index={2}>
                    <Image src={screenshot3}/>
                </Slide>
                <Slide index={3}>
                    <Image src={screenshot4}/>               
                </Slide>
            </Slider>
        </CarouselProvider>
    )
    const handleLogin = async()=>{
        try{
            setError('');
            setLoading(true);
            let res = await login(email , password);
            setLoading(false);
            navigate('/feed');
        }catch(error){
            setError("error open console to know more");
            console.log(error);
            setTimeout(()=>{
                setError('');
            },5000);
            setLoading(false);
        }
    }
    return (
    <div className={styles.LoginBody}>
        <div className={styles.imageCardCont}>
            <div className={styles.imageCard}>
               {carousel}
            </div>
        </div>
        <div className={styles.loginWrapper}>
            <Card variant="outlined" className={styles.loginCard}>
                <CardContent>
                    <Typography variant='h2' style={{fontFamily:'Cedarville Cursive'}} >Instagram</Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField fullWidth label="Email" margin="dense" size='small' value={email} onChange={(e)=>setEmail(e.target.value)}></TextField>
                    <TextField fullWidth label="Password" margin="dense" size='small' value={password} onChange={(e)=>setPassword(e.target.value)}></TextField>
                    <Button fullWidth margin="dense" >
                        <Typography color="primary" variant="body" style={{width:"100%"}}>
                            Forget Password ?
                        </Typography>
                    </Button>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant="contained" margin="dense" disabled={loading} onClick={handleLogin} >Log in</Button>
                </CardActions>
                
                <Card variant="outlined" className={styles.card2}>
                    <CardContent className={styles.cardCont} >
                        <Typography >
                            don't have an account ? <Link to="/signup" style={{textDecoration:"none"}} >Sign up</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Card>
        </div>
    </div>
    );
}

export default Login ;