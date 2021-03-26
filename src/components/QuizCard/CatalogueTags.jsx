import React from 'react';
import Badge from 'components/Badge/Badge';
import { useSelector } from 'react-redux';
import { quizTagsSelector } from 'utils/selectors';

function CatalogueTags({ tagList, ...props }) {
  const tagsObject = useSelector(quizTagsSelector);
  if (!tagList) {
    return null;
  }
  const QuizTags = Array.isArray(tagList) ? tagList : [tagList];

  return (
    <>
      {QuizTags.map((tag, idx) => (
        <Badge key={idx} color={idx % 2 === 0 ? 'primary' : 'info'}>
          {tagsObject[tag].name}
        </Badge>
      ))}
    </>
  );
}

export default CatalogueTags;
