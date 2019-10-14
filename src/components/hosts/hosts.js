import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Card, Accordion, Icon } from 'semantic-ui-react';

import { capitalize } from '../../utilities';

import Truncate from '../../shared/textFormatters/truncate';
import Titler from '../../shared/titler';

import HostDetails from './hostDetails';

const Hosts = ({ hosts = [] }) => {
  const [hostIds, updateHosts] = useState([]);
  const onClick = (e, obj) => {
    updateHosts(prev => {
      const id = obj['data-hostid'];
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return [id, ...prev];
    });
  };

  return (
    <>
      <Header content="Hosts" as="h3" />
      <Accordion>
        {hosts.map((host, idx) => {
          const { hostnames } = host;
          const parsedHostname = JSON.parse(hostnames);
          let hostnameDisplay = host.ip4_addr;
          if (Array.isArray(parsedHostname) && !!parsedHostname[0]) {
            // eslint-disable-next-line prefer-destructuring
            hostnameDisplay = parsedHostname[0];
          }
          const active = hostIds.includes(host.id);
          return (
            <Card key={host.id} onClick={onClick} data-hostid={host.id} fluid>
              <Card.Content>
                <Card.Header>
                  <Accordion.Title active={active} index={idx}>
                    <Truncate>
                      <Icon name="dropdown" />
                      {hostnameDisplay}
                    </Truncate>
                  </Accordion.Title>
                </Card.Header>
                <Card.Meta>
                  <Titler
                    title="Status"
                    value={capitalize(host.status)}
                    bold
                    linebreak
                  />
                  {active && <HostDetails host={host} />}
                </Card.Meta>
              </Card.Content>
            </Card>
          );
        })}
      </Accordion>
    </>
  );
};

Hosts.propTypes = {
  hosts: PropTypes.array
};

export default Hosts;
