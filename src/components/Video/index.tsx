import React from 'react';
import Iframe from './styles';

interface Props {
  urlKey: string;
  site: string;
}

const supportedSite = 'YouTube';

export default function Video({ urlKey, site }: Props) {
  function getSource() {
    if (site === supportedSite) return `https://www.youtube.com/embed/${urlKey}`;
    return '';
  }

  if (site !== supportedSite) return null;

  return <Iframe src={getSource()} />;
}
