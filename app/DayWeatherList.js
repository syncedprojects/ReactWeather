import React from 'react';
import moment from 'moment';
moment.locale( 'ru' );

const DayWeatherList = ( props ) => {
    let dayTimesWeather = {};

    for ( let i = 0; i < props.weatherInfo.length; i++ ) {
        const dtWeather = props.weatherInfo[ i ];

        const date = dtWeather.dt_txt.substr( 0, 10 );
        if ( typeof undefined === typeof dayTimesWeather[ date ] ) {
            dayTimesWeather[ date ] = {};
        }
        dayTimesWeather[ date ].dayName = moment( dtWeather.dt_txt ).format( 'dddd' );
        if ( typeof undefined === typeof dayTimesWeather[ date ].weatherData ) {
            dayTimesWeather[ date ].weatherData = {};
        }
        const time = dtWeather.dt_txt.substr( 11, 5 );
        if ( typeof undefined === typeof dayTimesWeather[ date ].weatherData[ time ] ) {
            dayTimesWeather[ date ].weatherData[ time ] = {};
        }
        dayTimesWeather[ date ].weatherData[ time ].clock = time;
        dayTimesWeather[ date ].weatherData[ time ].temperature = dtWeather.main.temp;
        dayTimesWeather[ date ].weatherData[ time ].humidity = dtWeather.main.humidity;
        // NOTE: It is possible to meet more than one weather condition for a requested location.
        // The first weather condition in API respond is primary.
        dayTimesWeather[ date ].weatherData[ time ].description = dtWeather.weather[ 0 ].description;
        dayTimesWeather[ date ].weatherData[ time ].icon = 'https://openweathermap.org/img/wn/' + dtWeather.weather[ 0 ].icon + '@2x.png';
        dayTimesWeather[ date ].weatherData[ time ].cloudiness = dtWeather.clouds.all;
        dayTimesWeather[ date ].weatherData[ time ].windSpeed = dtWeather.wind.speed;
    }

    return (
        <ul id="weather-info-list" className="list-unstyled text-center text-md-left">
            {
                Object.keys( dayTimesWeather ).map( function( date, index ) {
                    const dateObj = dayTimesWeather[ date ];
                    return (
                        <li key={ index }>
                            <h4 className="dayName-title">{ dateObj.dayName }, <small>{ moment( date + ' 00:00:00' ).format( 'DD / MM / YYYY' ) }</small></h4>
                            <ul className="list-unstyled list-inline day-weather d-flex justify-content-around justify-content-lg-start flex-wrap">
                                {
                                    Object.keys( dateObj.weatherData ).map( function( time, index ) {
                                        const dayTime = dateObj.weatherData[ time ];
                                        return (
                                            <li key={ index } className="list-inline-item">
                                                <div className="card">
                                                    <div className="card-header text-center">
                                                        <span className="d-block"><i className="fa fa-clock-o"></i> { dayTime.clock }</span>
                                                    </div>
                                                    <div className="card-body text-center">
                                                        <img className="d-block" src={ dayTime.icon } alt="" />
                                                        <span className="d-block"><small>{ dayTime.description }</small></span>
                                                    </div>
                                                    <div className="card-footer">
                                                        <span className="d-block"><i className="fa fa-thermometer"></i> { dayTime.temperature }C<sup>o</sup></span>
                                                        <span className="d-block"><small>{ `Влажность` }: { dayTime.humidity }%</small></span>
                                                        <span className="d-block"><small>{ `Скор. вет.` }: { dayTime.windSpeed }м/с</small></span>
                                                        <span className="d-block"><small>{ `Облачность` }: { dayTime.cloudiness }%</small></span>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    } )
                                }
                            </ul>
                        </li>
                    );
                } )
            }
        </ul>
    );
};

export default DayWeatherList;