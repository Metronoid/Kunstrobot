/**
 * Created by wander on 6/13/17.
 */
import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react';

class Loadbar extends Component {
    constructor (props) {
        super(props)
    }

    componentDidUpdate (){
        this.percent = parseInt(this.props.percent);
        this.deg = 360*this.percent/100 ;
        this.element = this.refs.progress.getDOMNode();
        this.element.style.transform = 'rotate(-'+ this.deg +'deg)';
        this.percent = Math.floor(this.props.percent);
        this.classes = classSet({
            "progress-pie-chart": true,
            "gt-50": this.percent > 50
        });
    }

    render() {
        return (
            <div className="loadbar clearfix">
                <div className={this.classes}>
                    <div className="ppc-progress">
                        <div className="ppc-progress-fill" ref="progress"></div>
                    </div>
                    <div className="ppc-percents">
                        <div className="pcc-percents-wrapper">
                            <span>{this.percent + '%'}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default socketConnect(Loadbar)
