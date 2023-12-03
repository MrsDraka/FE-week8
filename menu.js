/**
 * Class that represents a member of a band.
 */
class BandMember {
    /**
     * Constructor for creating an object of type BandMember.
     */
    constructor(name, role, origin) {
        this.name = name;
        this.role = role;
        this.origin = origin;
    }

    /**
     * Describes the band member.
     */
    describe() {
        return `: ${this.name} is the ${this.role}, and is from ${this.origin}.`;
    }
}

/**
 * Class that represents a band.
 */
class Band {
    /**
     * Constructor for creating an object of type Band.
     */
    constructor(name, genre, location, status) {
        this.name = name;
        this.genre = genre;
        this.location = location;
        this.status = status;
        this.members = [];
    }

    /**
     * Describes the band.
     */
    describe() {
        return `${this.name} is a ${this.genre} band based in ${this.location}. The band is currently ${this.status} and has ${this.members.length} members.`;
    }

    /**
     * Adds a BandMember to the band.
     */
    addBandMember(member) {
        if (member instanceof BandMember) {
            this.members.push(member);
        } else {
            throw new Error(`You can only add an instance of BandMember. ${member} is not a BandMember.`);
        }
    }

    /**
     * Removes a BandMember from the band.
     */
    removeBandMember(index) {
        if (index > -1 && index < this.members.length) {
            this.members.splice(index, 1);
        } else {
            throw new Error(`Index provided is out of bounds.`);
        }
    }
}

/**
 * Menu class for managing bands and their members.
 */
class Menu {
    /**
     * Constructor for creating an instance of Menu.
     */
    constructor() {
        this.bands = [];
        this.selectedBand = null;
    }

    /**
     * Starts the menu and provides options to the user.
     */
    mainMenu() {
        let selection = this.showOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createBand();
                    break;
                case '2':
                    this.viewBand();
                    break;
                case '3':
                    this.deleteBand();
                    break;
                case '4':
                    this.displayBands();
                    break;
                default:
                    selection = '0';
            }
            selection = this.showOptions();
        }
        alert("Adios! Thank you for using BandForge!");
    }

    /**
     * Shows the main menu options to the user.
     */
    showOptions() {
        return prompt(`
Welcome to BandForge!
  Please pick an option from our menu:
  0) Exit
  1) Add a new band
  2) View a band
  3) Delete a band
  4) List all bands
  `);
    }

    /**
     * Creates a new band and adds it to the list of bands.
     */
    createBand() {
        let name = prompt("Enter the band's name:");
        let genre = prompt("Enter the band's genre:");
        let location = prompt("Enter the band's location:");
        let status = prompt("Enter the band's current status:");
        this.bands.push(new Band(name, genre, location, status));
    }

    /**
     * Views the details of a band and manages its members.
     */
    viewBand() {
        let index = prompt("Enter the band's index:");
        if (index > -1 && index < this.bands.length) {
            this.selectedBand = this.bands[index];
            let description = 'Band Name: ' + this.selectedBand.name + '\n';
            description += this.selectedBand.describe() + '\n';
            for (let i = 0; i < this.selectedBand.members.length; i++) {
                description += i + ') ' + this.selectedBand.members[i].describe() + '\n';
            }
            let selection = this.showBandOptions(description);
            switch (selection) {
                case '1':
                    this.createBandMember();
                    break;
                case '2':
                    this.deleteBandMember();
                    break;
            }
        } else {
            alert('Invalid index. Please try again.');
        }
    }

    /**
     * Shows the band menu options to the user.
     */
    showBandOptions(bandInfo) {
        return prompt(`
        Please pick an option!

        0) Go Back
        1) Add a new band member
        2) Delete a member from the band
        -----------------
        ${bandInfo}
        `);
    }

    /**
     * Creates a new band member and adds them to the selected band.
     */
    createBandMember() {
        let name = prompt("Enter the band member's name:");
        let role = prompt("Enter the band member's role:");
        let origin = prompt("Enter band member's origin:");
        this.selectedBand.addBandMember(new BandMember(name, role, origin));
    }

    /**
     * Deletes a band member from the selected band.
     */
    deleteBandMember() {
        let index = prompt('Enter the index of the member you want to delete:');
        this.selectedBand.removeBandMember(index);
    }

    /**
     * Deletes a band from the list of bands.
     */
    deleteBand() {
        let index = prompt('Enter the index of the band you want to delete:');
        if (index > -1 && index < this.bands.length) {
            this.bands.splice(index, 1);
        } else {
            alert('Invalid index. Please try again.');
        }
    }

    /**
     * Displays a list of all bands with their indices.
     */
    displayBands() {
        let bandList = 'List of Bands:\n';
        for (let i = 0; i < this.bands.length; i++) {
            bandList += i + ') ' + this.bands[i].name + '\n';
        }
        alert(bandList);
    }
}

// Creates an instance of the Menu class and starts the application.
const menu = new Menu();
menu.mainMenu();