import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';


export default class Home extends Component{

    render(){
        return(
            <div >
                <Grid container spacing={2}>
                    <Grid item xs>
                       <div style={{backgroundColor:"green"}}>
                           <h1>Codigo</h1>
                       </div>
                    </Grid>
                    <Grid item xs>
                        <div style={{backgroundColor:"red"}}>
                            <h1>Ejecucuion</h1>
                        </div>
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
}
