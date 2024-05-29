
let stopSorting = false;

const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', async () => {
    stopSorting = true;
    await (sleep(1000));
    stopSorting = false;
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function bubbleSort(data) {
    let n = data.length;
    let swapped;
    do {
        if(stopSorting) {
            return;
        }
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (data[i] > data[i + 1]) {
                let temp = data[i];
                data[i] = data[i + 1];
                data[i + 1] = temp;
                swapped = true;

                algorithmUpdateBars(data);
                await sleep(document.getElementById('timeDelay').value);
            }
        }
    } while (swapped);
    
}

async function selectionSort(data) {
    let n = data.length;
    for (let i = 0; i < n - 1; i++) {
        if(stopSorting) {
            return;
        }
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (data[j] < data[minIndex]) {
                minIndex = j;
            }
        }
        let temp = data[i];
        data[i] = data[minIndex];
        data[minIndex] = temp;

        algorithmUpdateBars(data);
        await sleep(document.getElementById('timeDelay').value);
    }
}

async function insertionSort(data) {
    let n = data.length;
    for (let i = 1; i < n; i++) {
        if(stopSorting) {
            return;
        }
        let key = data[i];
        let j = i - 1;
        while (j >= 0 && data[j] > key) {
            data[j + 1] = data[j];
            j = j - 1;
        }
        data[j + 1] = key;

        algorithmUpdateBars(data);
        await sleep(document.getElementById('timeDelay').value);
    }
}

async function mergeSort(data) {
    if (data.length <= 1) {
        return data;
    }
    
    const mid = Math.floor(data.length / 2);
    const left = data.slice(0, mid);
    const right = data.slice(mid);
    if(stopSorting) {
        return;
    }
    await mergeSort(left);
    await mergeSort(right);
    
    await merge(data, left, right);
    
    algorithmUpdateBars(data);
    await sleep(document.getElementById('timeDelay').value);
}



async function merge(data, left, right) {
    let i = 0;
    let j = 0;
    let k = 0;
    
    while (i < left.length && j < right.length) {
        if(stopSorting) {
            return;
        }
        if (left[i] <= right[j]) {
            data[k] = left[i];
            i++;
        } else {
            data[k] = right[j];
            j++;
        }
        k++;
    }
    
    while (i < left.length) {
        if(stopSorting) {
            return;
        }
        data[k] = left[i];
        i++;
        k++;
    }
    
    while (j < right.length) {
        if(stopSorting) {
            return;
        }
        data[k] = right[j];
        j++;
        k++;
    }
}












async function quickSort(data, low, high) {
    if(stopSorting) {
        return;
    }
    if (low < high) {
        let pi = await partition(data, low, high);
        
        await quickSort(data, low, pi - 1);
        await quickSort(data, pi + 1, high);
    }
}

async function partition(data, low, high) {
    let pivot = data[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (data[j] < pivot) {
            i++;
            let temp = data[i];
            data[i] = data[j];
            data[j] = temp;
        }
    }
    
    let temp = data[i + 1];
    data[i + 1] = data[high];
    data[high] = temp;
    
    algorithmUpdateBars(data);
    await sleep(document.getElementById('timeDelay').value);
    
    return i + 1;
}










async function heapSort(data) {
    let n = data.length;
    
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if(stopSorting) {
            return;
        }
        await heapify(data, n, i);
    }
    
    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        if(stopSorting) {
            return;
        }
        // Move current root to end
        let temp = data[0];
        data[0] = data[i];
        data[i] = temp;
        
        // Update bars after each swap
        algorithmUpdateBars(data);
        await sleep(document.getElementById('timeDelay').value);
        
        // Call max heapify on the reduced heap
        await heapify(data, i, 0);
    }
}

async function heapify(data, n, i) {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // left = 2*i + 1
    let right = 2 * i + 2; // right = 2*i + 2
    
    // If left child is larger than root
    if (left < n && data[left] > data[largest]) {
        largest = left;
    }
    
    // If right child is larger than largest so far
    if (right < n && data[right] > data[largest]) {
        largest = right;
    }
    
    // If largest is not root
    if (largest != i) {
        let temp = data[i];
        data[i] = data[largest];
        data[largest] = temp;
        
        // Update bars after each swap
        algorithmUpdateBars(data);
        await sleep(document.getElementById('timeDelay').value);
        
        // Recursively heapify the affected sub-tree
        await heapify(data, n, largest);
    }
}







async function radixSort(data) {
    let max = Math.max(...data);
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        if(stopSorting) {
            return;
        }
        await countingSort(data, exp);
    }
}

async function countingSort(data, exp) {
    
    let n = data.length;
    let output = new Array(n);
    let count = new Array(10).fill(0);
    
    for (let i = 0; i < n; i++) {
        count[Math.floor(data[i] / exp) % 10]++;
    }
    
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(data[i] / exp) % 10] - 1] = data[i];
        count[Math.floor(data[i] / exp) % 10]--;
    }
    
    for (let i = 0; i < n; i++) {
        data[i] = output[i];
    }
    
    algorithmUpdateBars(data);
    await sleep(document.getElementById('timeDelay').value);
}

async function bogoSort(data) {
    while (!isSorted(data)) {
        if(stopSorting) {
            return;
        }
        shuffle(data);
        algorithmUpdateBars(data);
        await sleep(document.getElementById('timeDelay').value);
    }
}

function isSorted(data) {
    for (let i = 1; i < data.length; i++) {
        if (data[i - 1] > data[i]) {
            return false;
        }
    }
    return true;
}


function shuffle(data) {
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
}