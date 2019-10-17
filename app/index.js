import React from 'react';
import ReactDOM from 'react-dom';
import CityNameInputForm from './CityNameInputForm';
import DayWeatherList from './DayWeatherList';

class App extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            weatherInfo: [],
        };

        this.onWeatherFetch = this.onWeatherFetch.bind( this );
    }

    onWeatherFetch( weatherInfo ) {
        this.setState( {
            weatherInfo: weatherInfo,
        } );
    }

    render() {
        return (
            <div className="">
                <h5 id="page-title" className="text-center text-md-left">{ `Прогноз погоды на 5 дней в вашем городе` }</h5>
                <CityNameInputForm onWeatherFetch={ this.onWeatherFetch } />
                {
                    ( this.state.weatherInfo.length > 0 ) ?
                        <DayWeatherList weatherInfo={ this.state.weatherInfo } />
                        :
                        null
                }
            </div>
        );
    }
}

ReactDOM.render( <App />, document.getElementById( 'root' ) );