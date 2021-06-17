import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllConversations, filterConversations, searchReplies } from '../../redux/conversations/thunks.js';
import { fetchTags } from '../../redux/tags/thunks.js';
import * as Font from '../styled/Font.js';
import * as Card from './Card.js';
import * as Div from '../styled/Div.js';
import SearchCollapse from '../styled/SearchCollapse.js';
import { Pill } from '../styled/Pill.js';

function AllConvos(props) {
  const [selectedTags, setTags] = useState([]);
  const [searchStr, setSearch] = useState('');
  const convosList = useSelector(state => state.allConversations);
  const activeTags = useSelector(state => state.tags.active);
  const whitelist = useSelector(state => state.tags.whitelist);
  const dispatch = useDispatch();

  const handleClick = id => {
    props.history.push(`/conversations/${id}`);
  };

  const handleChange = (body) => {
    if (body) {
      dispatch(searchReplies(body));
    } else {
      selectedTags.length ? 
      dispatch(filterConversations(selectedTags))
      : dispatch(fetchAllConversations())
    }
    setSearch(body);
  };

  const handleFilter = (tag) => {
    let updatedTags = [...selectedTags];
    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter(t => t !== tag);
    } else {
      updatedTags.push(tag);
    }
    setTags(updatedTags);
  };

  useEffect(() => {
    if (!Object.keys(whitelist).length) {
      dispatch(fetchTags());
    }
    if (!selectedTags.length) {
      dispatch(fetchAllConversations());
    } else {
      dispatch(filterConversations(selectedTags))
    }
  }, [selectedTags]);


  return (
    <Div.Container id="conversations-index">
      <Font.h1>Discuss. Develop. Learn.</Font.h1>
      <Font.Paragraph>
        LearnDot forums are a great way to get help from your peers.
      </Font.Paragraph>
      <Card.CardContainer>
        {
            activeTags.map(tag => (
            <Pill
                key={tag.id}
                selected={selectedTags.includes(tag.name)}
                onClick={() => handleFilter(tag.name)}
            >
                {tag.name}
            </Pill>))
        }
      </Card.CardContainer>
      <SearchCollapse
        type="text"
        name="search"
        placeholder="Search All"
        value={searchStr}
        onChange={e => handleChange(e.target.value)}
      />
      <Card.CardContainer>
        {convosList.map(convo => (
          <Card.Card key={convo.id} onClick={() => handleClick(convo.id)}>
            <Font.h5>{convo.title}</Font.h5>
            {convo.hasAnswer && <Font.Label style={{ color: '#7992FF' }}>Answered</Font.Label>}
          </Card.Card>
        ))}
      </Card.CardContainer>
    </Div.Container>
  );
};

export default AllConvos;
