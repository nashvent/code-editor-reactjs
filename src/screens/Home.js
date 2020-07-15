import React,{Component} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
require('prismjs/components/prism-python');

const server_url = "http://192.168.1.24:8080";

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            output: '',
        };
        this.token = null;
        this.executeCode = this.executeCode.bind(this);
    }

    componentDidMount(){
        this.getToken();
    }

    async getToken(){
        const rawResponse = await fetch(server_url,{method: 'GET'});
        const response = await rawResponse.json();
        this.token = response.token;
    }

    async executeCode(){
        const rawResponse = await fetch(server_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: this.state.input,
                token: this.token
            })
        });
        const content = await rawResponse.json();
        console.log(content);
        this.setState({ output: content.result});

    }
    add(event){
        console.log(event.keyCode); //press TAB and get the keyCode
    }

    render(){

        return(
            <section id="service" className="service-python">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Code Execution as a Service</h1>
                        <p className="lead">By Anibal Ventura</p>
                    </div>
                </div>
                <div className="sidebar-wrapper">
                    <a href="#" title="Python">
                        <img src={"/img/python.png"} alt="" width="100%"/>
                    </a>
                </div>
                <div className="editor-wrapper">
                    <div className="editor-desktop-top-bar">
                        <div className="file-name">main.py</div>
                        <div className="desktop-top-bar">
                            <button className="desktop-run-button run" onClick={this.executeCode}>Run</button>
                        </div>
                    </div>

                    <div id="editor">
                        <div className="row no-gutters">
                            <div className="col-1 lines">
                                <div className="text-center">
                                    1
                                </div>
                            </div>
                            <div className="col-11">{/*
                                <textarea className="form-control" wrap="off" autoCorrect="off" autoCapitalize="off"
                                          spellCheck="false" value={this.state.input}
                                          onKeyDown={this.add}
                                          onChange={(event) => this.setState({input: event.target.value})}
                                />*/}
                                <Editor
                                    value={this.state.input}
                                    onValueChange={input => this.setState({ input: input })}
                                    highlight={input => highlight(input, languages.python)}
                                    padding={10}
                                    style={{
                                        fontFamily: '"Fira code", "Fira Mono", monospace',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="terminal-wrapper">
                    <div className="terminal-desktop-top-bar">
                        <div className="shell-name">
                            Output
                        </div>
                    </div>
                    <div id="terminal">
                        <pre style={{color:"#fff", fontSize:13}}>
                        { this.state.output }
                        </pre>
                    </div>
                </div>
            </section>

        );
    }
}
