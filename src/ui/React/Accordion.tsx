/**
 * React component to create an accordion element
 */
import * as React from "react";

type IProps = {
    headerClass?: string; // Override default class
    headerContent: React.ReactElement;
    panelClass?: string; // Override default class
    panelContent: React.ReactElement;
    panelInitiallyOpened?: boolean;
    style?: string;
}

type IState = {
    panelOpened: boolean;
}

export class Accordion extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.handleHeaderClick = this.handleHeaderClick.bind(this);

        this.state = {
            panelOpened: props.panelInitiallyOpened ? true : false,
        }
    }

    handleHeaderClick(e: React.MouseEvent<HTMLButtonElement>): void {
        const elem = e.currentTarget;
        elem.classList.toggle("active");

        const panel: HTMLElement = elem.nextElementSibling as HTMLElement;
        const active = elem.classList.contains("active");
        if (active) {
            panel.style.display = "block";
            this.setState({
                panelOpened: true,
            });
        } else {
            panel.style.display = "none";
            this.setState({
                panelOpened: false,
            });
        }
    }

    render(): React.ReactNode {
        let className = "accordion-header";
        if (typeof this.props.headerClass === "string") {
            className = this.props.headerClass;
        }

        return (
            <>
            <button className={className} onClick={this.handleHeaderClick}>
                {this.props.headerContent}
            </button>
            <AccordionPanel
                opened={this.state.panelOpened}
                panelClass={this.props.panelClass}
                panelContent={this.props.panelContent}
            />
            </>
        )
    }
}

type IPanelProps = {
    opened: boolean;
    panelClass?: string; // Override default class
    panelContent: React.ReactElement;
}

class AccordionPanel extends React.Component<IPanelProps, any> {
    shouldComponentUpdate(nextProps: IPanelProps): boolean {
        return this.props.opened || nextProps.opened;
    }

    render(): React.ReactNode {
        let className = "accordion-panel"
        if (typeof this.props.panelClass === "string") {
            className = this.props.panelClass;
        }

        return (
            <div className={className}>
                {this.props.panelContent}
            </div>
        )
    }
}
