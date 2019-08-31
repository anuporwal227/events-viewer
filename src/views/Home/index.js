import React, { useState } from 'react';

import cls from 'classnames';

import Header from 'components/Header';

import {EVENTS} from 'globals/constants';
import * as R from 'ramda';

import css from './styles.module.scss';

const Home = () => {
    const [selectedTabs, setSelectedTabs] = useState([]);
    const [activeEventId, setActiveEventId] = useState(null);

    const addToSelectedTabs = (selectedEvent => {
        const isEventSelected = selectedTabs.filter(event => event.eventId === selectedEvent.eventId);
        if(!isEventSelected.length){
            setSelectedTabs([...selectedTabs, selectedEvent]);
            setActiveEventId(selectedEvent.eventId);
        }

    });

    const removeFromSelectedEvents = (eventId) => {
        const updatedTabs = selectedTabs.filter(event => event.eventId !== eventId);
        const selectedTabIndex = R.findIndex(R.propEq('eventId', eventId),  selectedTabs);
        let newActiveEventId = null;
        if(updatedTabs.length){
            if(selectedTabIndex){
                newActiveEventId = updatedTabs[selectedTabIndex-1].eventId;
            } else {
                newActiveEventId = updatedTabs[0].eventId;
            }
        }
        setSelectedTabs(updatedTabs);
        setTimeout(() => setActiveEventId(newActiveEventId), 0);
    };

    return <div className={css.home}>
        <Header/>
        <div className={css.content}>

            {/*Renders list of events*/}
            <div className={css['events-list']}>
                {EVENTS().map(event => <div className={css['event-type']}
                                            onClick={() => addToSelectedTabs(event)}
                                            key={event.eventId}>
                    {event.eventName}
                </div> )}
            </div>
            {/*Selected events are stored in the state variable selectedTabs and current active tab is maintained with activeEventId*/}
            <div className={css['selected-events']}>
                {selectedTabs.map(event => <div key={`selected_event_${event.eventId}`}
                                                onClick={() => setActiveEventId(event.eventId)}
                                                className={`${cls(css['selected-event'], activeEventId === event.eventId && css.active)} custom-tabs`}>
                    <p className={css['tab-content']}>{event.eventName}</p>
                    <span className={css['close-tab']}
                          onClick={() => removeFromSelectedEvents(event.eventId)}>&#10005;</span>
                </div>)}
            </div>

            <div className={css['event-details']}>
                <div className={css['active-tab-content']}>
                    {(() => {
                       const currentActiveEvent = selectedTabs.filter(event => event.eventId === activeEventId);
                       if(!currentActiveEvent.length) return null;
                       const { headers, data } = currentActiveEvent[0].content;
                       return (
                           <table className={css.table}>
                               <thead>
                                   <tr>
                                   {headers.map((i, index) => <th className={css.th} key={`headers_${index}`}><div>{i}</div></th>)}
                                   </tr>
                               </thead>
                               {data.length ?
                                   <tbody>
                                   {data.map((eventInfo, index) => <tr key={`event_info_${index}`}>
                                       {eventInfo.map(info => <td className={css.cell} key={info}>{info}</td>)}
                                   </tr>)}
                                   </tbody>:
                                   <tr>
                                       <td colSpan={headers.length} className={css.cell}>No data found</td>
                                   </tr>
                               }
                           </table>
                       )
                    })()}
                </div>
            </div>
        </div>
    </div>
};

export default Home;