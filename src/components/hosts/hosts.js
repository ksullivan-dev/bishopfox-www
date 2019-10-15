import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Card,
  Accordion,
  Icon,
  Divider,
  Button
} from 'semantic-ui-react';

import { capitalize } from 'utilities';

import Truncate from 'shared/textFormatters/truncate';
import Titler from 'shared/titler';
import Flex from 'shared/flex';

import HostDetails from 'components/hosts/hostDetails';
import Port from 'components/hosts/port';

const Hosts = ({ hosts = [] }) => {
  const all = hosts.map(host => host.id);
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

  const showAll = () => updateHosts(all);
  const collapseAll = () => updateHosts([]);

  return (
    <>
      <Header content="Hosts" as="h3" />
      <Button.Group size="small" compact>
        <Button content="Expand All" onClick={showAll} />
        <Button content="Collapse All" onClick={collapseAll} />
      </Button.Group>
      <br />
      <br />
      <Accordion>
        {hosts.map(host => {
          const { hostnames } = host;
          const parsedHostname = JSON.parse(hostnames);
          let hostnameDisplay = host.ip4_addr;
          if (Array.isArray(parsedHostname) && !!parsedHostname[0]) {
            // eslint-disable-next-line prefer-destructuring
            hostnameDisplay = parsedHostname[0];
          }
          const active = hostIds.includes(host.id);
          return (
            <Card key={host.id} fluid>
              <Card.Content>
                <Card.Header>
                  <Accordion.Title
                    active={active}
                    onClick={onClick}
                    data-hostid={host.id}
                  >
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
                {active && (
                  <Card.Description>
                    <Divider />
                    <Header as="h4" content="Ports" />
                    <Flex spacing="10" wrap>
                      {host.ports.map(port => (
                        <div flex="25" key={port.id} style={{ minWidth: 220 }}>
                          <Port port={port} key={port.id} />
                          <br />
                        </div>
                      ))}
                    </Flex>
                  </Card.Description>
                )}
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
