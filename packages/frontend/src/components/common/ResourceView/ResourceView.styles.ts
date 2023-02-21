import { Button, Card, Colors, H3, H4, Icon, Tag } from '@blueprintjs/core';
import styled from 'styled-components';

const paddingX = 20;

interface ResourceViewTabProps {
    selected: boolean;
}

export const ResourceViewContainer = styled(Card)`
    width: 768px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    padding: 0;
`;

export const ResourceViewHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px ${paddingX}px;
    gap: 6px;
    border-bottom: 1px solid ${Colors.LIGHT_GRAY2};
`;

export const ResourceViewSpacer = styled.div`
    flex: 1 0 auto;
`;

export const ResourceBreadcrumbTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ResourceTitle = styled(H3)`
    flex: 0 0 auto;
    margin: 0;
    color: ${Colors.DARK_GRAY1};
    font-size: 16px !important;
    font-weight: 600;
`;

export const ResourceTag = styled(Tag)`
    font-weight: bold;
    background-color: ${Colors.LIGHT_GRAY2};
    color: ${Colors.DARK_GRAY1};
`;

export const ResourceEmptyStateWrapper = styled.div`
    padding: 40px 0;
    display: flex;
    gap: 18px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ResourceEmptyStateIcon = styled(Icon)`
    path {
        fill: ${Colors.LIGHT_GRAY1};
    }
`;

export const ResourceEmptyStateHeaderWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ResourceEmptyStateHeader = styled(H4)`
    margin: 0;
`;

export const ResourceEmptyStateText = styled.span`
    color: ${Colors.GRAY1};
`;

export const ResourceViewTab = styled(Button)<ResourceViewTabProps>`
    margin: 15px 5px 15px 0;
    font-weight: 600;

    ${(props: ResourceViewTabProps) =>
        !props.selected
            ? `color: ${Colors.GRAY2} !important`
            : `background-color: rgba(33, 93, 176, 0.2) !important; color: ${Colors.BLUE2} !important`}
`;