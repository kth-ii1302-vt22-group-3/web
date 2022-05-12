function SidebarView(props) {
    return ( 
        <div className="sidebar">
            <p>
                <button className="sidebarButton hover">
                    Current Temperature
                </button></p>
            <p>
                <button className="sidebarButton hover">
                    Temperature Graph
                </button></p>
            <p>
                <button className="hidden">
                    -
                </button></p>
        </div>
    );
}

export default SidebarView; 