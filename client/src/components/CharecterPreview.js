import useCharecterInfo from '../hooks/useCharecterInfo'
import { useParams } from 'react-router';
import { List, Typography, Divider, Card } from 'antd';
import { Fragment, useState } from 'react';

const { Meta } = Card;
function CharecterPreview() {
    let { id } = useParams();
    const { loading, error, data } = useCharecterInfo({variables: {id}});

    const [locationState, setLocationState] = useState(false);
    const [episodeState, setEpisodeState] = useState(false);
    const [charecterState, setCharecterState] = useState([]);

    const handleLocation = () =>{
        setLocationState(!locationState);
    }
    const handleEpisode = (e, episodeName) =>{
        setEpisodeState(!episodeState)
        getCharecters(episodeName);
    }
    const handleCharecter = () =>{
        setEpisodeState(false)
    }

    const getCharecters = (episodeName) => {
       let charecters = data.character.episode.filter((ep) => {
            return ep.name === episodeName
        })[0].characters
        setCharecterState(charecters);
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!!</p>

    return (
        <Fragment>
            <Card
                cover={<img  alt={`${data.character.name} from the popular sitcom Rick & Morty`} 
                src={data.character.image} 
                style={{ width: "100%", borderRadius: "50%"}}
                />}
            >
                <Meta 
                title={<p style={{marginBottom: "1em"}}>{data.character.name} | {data.character.status} </p>} 
                description={
                        <p style={{
                            padding: ".5em", 
                            borderTop: "inset 1px",
                            fontSize: "calc(0.6rem + (1 - 0.6) * (100vw - 30rem) / (123.75 - 30))",
                        }}
                        onClick={handleLocation}
                        >
                            {data.character.location.name}
                        </p>
               
                }/>  
            </Card>
            <Divider orientation="left"></Divider> 
            {locationState ? (
                <List
                    header={<div style={{textAlign: "justify"}}>List of Residents</div>}
                    bordered
                    dataSource={data.character.location.residents}
                    renderItem={resident => (
                        <List.Item style={{textAlign: "justify"}}>
                            <Typography.Text mark>[Resident]</Typography.Text> {resident.name} 
                        </List.Item>
                    )}
            />
            ) : (
                episodeState ? (
                    <List
                    header={<div style={{textAlign: "justify"}}>List of Charecters</div>}
                    bordered
                    dataSource={charecterState}
                    renderItem={charecter => (
                        <List.Item 
                        style={{textAlign: "justify"}}
                        onClick={handleCharecter}
                        >
                            <Typography.Text mark>[Charecter]</Typography.Text> {charecter.name}
                        </List.Item>
                    )}
                />
                ) : (
                    <List
                    header={<div style={{textAlign: "justify"}}>List of Episodes</div>}
                    bordered
                    dataSource={data.character.episode}
                    renderItem={ep => (
                        <List.Item 
                        style={{textAlign: "justify"}}
                        onClick={(e) => handleEpisode(e, ep.name)}
                        >
                            <Typography.Text mark>[Episode]</Typography.Text> {ep.name}
                        </List.Item>
                    )}
                />
                )

            )}

        </Fragment>

    );
}

export default CharecterPreview