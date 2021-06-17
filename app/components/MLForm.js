import nlp from 'compromise';
import React, { useEffect, useState } from 'react';
import { MainContainer } from './styled/Div.js';
import { Header } from './styled/Font.js'
import { Container } from './styled/Form.js';
import { Input, TextField, InputFeedback, Label } from './styled/Input.js';
import { Button } from './styled/Button.js';
import { Pill } from './styled/Pill.js';
import Highlighter from 'react-highlight-words.js';
import whitelist from '../../whitelist.js';

const MLForm = () => {
    const [input, setInput] = useState('');
    const [topics, setTopics] = useState([]);
    const [tags, setTags] = useState([]);

    const handleClick = (topic) => {
        if (!tags.includes(topic)) {
            setTags([...tags, topic]);
        }
    }

    //todo: refactor this to be more efficient
    useEffect(() => {
        let streamTopic = [];
        let postTopics = nlp(input).normalize({ plurals:true, parentheses:true, possessives:true }).nouns();
        postTopics.out('freq').forEach(term => {
            if (!tags.includes(term.reduced)) {
                if (whitelist[term.reduced]) {
                    streamTopic.push(term.reduced);
                }
            }
        })
        setTopics(streamTopic);
    }, [input, tags])

    return (
        <MainContainer>
            <Container>
                <Header>ML Demo</Header>
                <Label>Type Here</Label>
                <TextField 
                rows='12'
                type='text'
                name='body'
                value={input}
                onChange={ev => setInput(ev.target.value)}
                />
                <Label>Tags</Label>
                {
                    tags.length ? 
                    tags.map(tag => <Pill key={tag}>{tag}</Pill>) : ''
                }
                <Label>Suggested</Label>
                {
                    topics.length ?
                    topics.map((topic, idx) => <Pill secondary key={topic} onClick={() => handleClick(topic)}>{topic}</Pill>)
                    : ''
                }
            </Container>
        </MainContainer>
    );
};

export default MLForm;