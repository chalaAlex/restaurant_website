# Receipt Printing from Web Application - Complete Guide

## Overview

Printing receipts from a web app to a thermal printer involves several approaches. This guide covers all methods from simple to advanced.

---

## Understanding Receipt Printers

### Types of Receipt Printers

**1. Thermal Receipt Printers (Most Common)**
- No ink/toner required
- Uses heat-sensitive paper
- Fast printing (up to 250mm/sec)
- Common width: 58mm or 80mm
- Examples: Epson TM-T88, Star TSP143, Bixolon SRP-350

**2. Impact Dot Matrix**
- Older technology
- Uses ribbon
- Can print multi-part forms
- Slower and noisier

**3. Inkjet/Laser**
- Standard office printers
- Not ideal for receipts
- Can work but slower

### Connection Methods

```
┌─────────────────────────────────────────────┐
│         PRINTER CONNECTION OPTIONS          │
└─────────────────────────────────────────────┘

1. USB Connection
   ├─ Direct to computer/tablet
   ├─ Most reliable
   └─ Requires driver installation

2. Network (Ethernet)
   ├─ Connected to local network
   ├─ Can print from multiple devices
   └─ Requires IP address

3. Bluetooth
   ├─ Wireless connection
   ├─ Limited range (10-30 feet)
   └─ Good for mobile POS

4. WiFi
   ├─ Wireless over WiFi network
   ├─ Multiple device support
   └─ Requires network setup
```

---

## Method 1: Browser Native Print API (Simplest)

### When to Use:
- Basic receipt printing
- Standard desktop/laptop setup
- Office printer or any printer with driver

### Implementation:



#### Step 1: Create Receipt Component

```typescript
// components/Receipt.tsx
interface ReceiptProps {
  orderNumber: number
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  paymentMethod: string
  timestamp: Date
  cashier: string
}

export default function Receipt({
  orderNumber,
  items,
  subtotal,
  tax,
  total,
  paymentMethod,
  timestamp,
  cashier
}: ReceiptProps) {
  return (
    <div className="receipt" style={{
      width: '80mm',
      fontFamily: 'monospace',
      fontSize: '12px',
      padding: '10mm',
      color: '#000'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '5mm' }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>BELLA VISTA</h2>
        <p style={{ margin: 0 }}>123 Main Street</p>
        <p style={{ margin: 0 }}>New York, NY 10001</p>
        <p style={{ margin: 0 }}>Tel: (123) 456-7890</p>
      </div>
      
      {/* Divider */}
      <div style={{ 
        borderTop: '1px dashed #000', 
        margin: '5mm 0' 
      }} />
      
      {/* Order Info */}
      <div style={{ marginBottom: '5mm' }}>
        <p style={{ margin: 0 }}>Order #: {orderNumber}</p>
        <p style={{ margin: 0 }}>
          Date: {timestamp.toLocaleDateString()} {timestamp.toLocaleTimeString()}
        </p>
        <p style={{ margin: 0 }}>Cashier: {cashier}</p>
      </div>
      
      {/* Divider */}
      <div style={{ 
        borderTop: '1px dashed #000', 
        margin: '5mm 0' 
      }} />
      
      {/* Items */}
      <div style={{ marginBottom: '5mm' }}>
        {items.map((item, index) => (
          <div key={index} style={{ marginBottom: '3mm' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between' 
            }}>
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
            <div style={{ paddingLeft: '5mm', fontSize: '10px' }}>
              {item.quantity} x ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Divider */}
      <div style={{ 
        borderTop: '1px dashed #000', 
        margin: '5mm 0' 
      }} />
      
      {/* Totals */}
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '2mm'
        }}>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '2mm'
        }}>
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          fontWeight: 'bold',
          fontSize: '14px',
          borderTop: '1px solid #000',
          paddingTop: '2mm'
        }}>
          <span>TOTAL:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Payment Method */}
      <div style={{ marginTop: '5mm', textAlign: 'center' }}>
        <p style={{ margin: 0 }}>Payment: {paymentMethod}</p>
      </div>
      
      {/* Footer */}
      <div style={{ 
        marginTop: '10mm', 
        textAlign: 'center',
        fontSize: '10px'
      }}>
        <p style={{ margin: 0 }}>Thank you for dining with us!</p>
        <p style={{ margin: 0 }}>Visit us at www.bellavista.com</p>
      </div>
    </div>
  )
}
```



#### Step 2: Print Styles (CSS)

```css
/* styles/print.css */

@media print {
  /* Hide everything except receipt */
  body * {
    visibility: hidden;
  }
  
  .receipt, .receipt * {
    visibility: visible;
  }
  
  .receipt {
    position: absolute;
    left: 0;
    top: 0;
    width: 80mm;
  }
  
  /* Remove margins */
  @page {
    margin: 0;
    size: 80mm auto; /* Width: 80mm, Height: auto */
  }
  
  /* Hide print button */
  .no-print {
    display: none !important;
  }
}
```

#### Step 3: Print Function

```typescript
// hooks/usePrint.ts
import { useRef } from 'react'

export function usePrint() {
  const printReceipt = () => {
    window.print()
  }
  
  return { printReceipt }
}

// Or with react-to-print library
import { useReactToPrint } from 'react-to-print'

export function usePrintReceipt() {
  const receiptRef = useRef<HTMLDivElement>(null)
  
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Receipt-${Date.now()}`,
    onAfterPrint: () => console.log('Receipt printed'),
  })
  
  return { receiptRef, handlePrint }
}
```

#### Step 4: Usage in Component

```typescript
// pages/pos.tsx
'use client'

import { useState } from 'react'
import Receipt from '@/components/Receipt'
import { usePrintReceipt } from '@/hooks/usePrint'

export default function POSPage() {
  const [order, setOrder] = useState(null)
  const { receiptRef, handlePrint } = usePrintReceipt()
  
  const completeOrder = async () => {
    // Process order
    const newOrder = await createOrder(...)
    setOrder(newOrder)
    
    // Automatically print
    setTimeout(() => {
      handlePrint()
    }, 100)
  }
  
  return (
    <div>
      <div className="pos-interface">
        {/* POS UI */}
        <button onClick={completeOrder}>
          Complete Order
        </button>
      </div>
      
      {/* Hidden receipt for printing */}
      <div style={{ display: 'none' }}>
        <div ref={receiptRef}>
          {order && <Receipt {...order} />}
        </div>
      </div>
    </div>
  )
}
```

**Installation:**
```bash
npm install react-to-print
```



---

## Method 2: ESC/POS Commands (Professional Thermal Printers)

### When to Use:
- Thermal receipt printers (Epson TM-series, Star, etc.)
- Need barcode/QR code printing
- Want precise control over formatting
- Professional POS setup

### What is ESC/POS?

ESC/POS is a command language used by most receipt printers. It uses escape sequences to control:
- Text formatting (bold, size, alignment)
- Images and logos
- Barcodes and QR codes
- Paper cutting
- Cash drawer opening

### Implementation with escpos Library:

#### Step 1: Install Dependencies

```bash
# For Node.js backend
npm install escpos escpos-usb

# Or for browser (with USB WebAPI)
npm install escpos-printer-toolkit
```

#### Step 2: Backend Print Server (Node.js)

```typescript
// server/print-server.ts
import escpos from 'escpos'
import USB from 'escpos-usb'

// Initialize USB device
escpos.USB = USB

interface PrintReceiptData {
  orderNumber: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  subtotal: number
  tax: number
  total: number
  paymentMethod: string
  timestamp: Date
}

export async function printReceipt(data: PrintReceiptData) {
  // Find USB printer
  const device = new escpos.USB()
  
  const printer = new escpos.Printer(device, {
    encoding: 'utf8'
  })
  
  device.open(async (error) => {
    if (error) {
      console.error('Printer error:', error)
      return
    }
    
    printer
      // Initialize printer
      .font('a')
      .align('ct') // Center text
      .style('bu') // Bold + Underline
      .size(2, 2) // Double size
      .text('BELLA VISTA')
      .size(1, 1) // Normal size
      .style('normal')
      .text('123 Main Street')
      .text('New York, NY 10001')
      .text('Tel: (123) 456-7890')
      .text('')
      
      // Divider
      .drawLine()
      
      // Order info
      .align('lt') // Left align
      .text(`Order #: ${data.orderNumber}`)
      .text(`Date: ${new Date(data.timestamp).toLocaleString()}`)
      .text('')
      
      // Divider
      .drawLine()
      
    // Print items
    for (const item of data.items) {
      printer
        .tableCustom([
          { text: item.name, align: 'LEFT', width: 0.6 },
          { text: `$${item.price.toFixed(2)}`, align: 'RIGHT', width: 0.4 }
        ])
        .text(`  ${item.quantity} x $${item.price.toFixed(2)}`)
    }
    
    printer
      .text('')
      .drawLine()
      
      // Totals
      .tableCustom([
        { text: 'Subtotal:', align: 'LEFT', width: 0.6 },
        { text: `$${data.subtotal.toFixed(2)}`, align: 'RIGHT', width: 0.4 }
      ])
      .tableCustom([
        { text: 'Tax:', align: 'LEFT', width: 0.6 },
        { text: `$${data.tax.toFixed(2)}`, align: 'RIGHT', width: 0.4 }
      ])
      .drawLine()
      .style('b')
      .size(2, 2)
      .tableCustom([
        { text: 'TOTAL:', align: 'LEFT', width: 0.6 },
        { text: `$${data.total.toFixed(2)}`, align: 'RIGHT', width: 0.4 }
      ])
      .size(1, 1)
      .style('normal')
      
      // Payment method
      .text('')
      .align('ct')
      .text(`Payment: ${data.paymentMethod}`)
      
      // QR Code (optional)
      .text('')
      .qrcode(`https://bellavista.com/receipt/${data.orderNumber}`, {
        type: 'qrcode',
        size: 6,
        correction: 'M'
      })
      
      // Footer
      .text('')
      .text('Thank you for dining with us!')
      .text('www.bellavista.com')
      
      // Cut paper
      .text('')
      .text('')
      .cut()
      
      // Close connection
      .close()
  })
}
```



#### Step 3: API Endpoint for Printing

```typescript
// app/api/print/receipt/route.ts
import { NextResponse } from 'next/server'
import { printReceipt } from '@/server/print-server'

export async function POST(request: Request) {
  try {
    const receiptData = await request.json()
    
    // Send to printer
    await printReceipt(receiptData)
    
    return NextResponse.json({ 
      success: true,
      message: 'Receipt sent to printer' 
    })
    
  } catch (error) {
    console.error('Print error:', error)
    return NextResponse.json(
      { error: 'Failed to print receipt' },
      { status: 500 }
    )
  }
}
```

#### Step 4: Frontend Print Request

```typescript
// In your POS component
async function printOrderReceipt(order: Order) {
  try {
    const response = await fetch('/api/print/receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNumber: order.orderNumber,
        items: order.items,
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
        paymentMethod: order.paymentMethod,
        timestamp: order.timestamp
      })
    })
    
    const result = await response.json()
    
    if (result.success) {
      console.log('Receipt printed successfully')
    } else {
      alert('Failed to print receipt')
    }
    
  } catch (error) {
    console.error('Print request failed:', error)
    alert('Printer connection error')
  }
}
```

---

## Method 3: Network/IP Printing (Most Reliable for Restaurants)

### When to Use:
- Printer connected to network (Ethernet or WiFi)
- Multiple POS stations sharing one printer
- Most reliable for production environments

### Setup:

#### Step 1: Configure Printer IP

Most network printers have a configuration menu:
```
Printer Menu:
├─ Network Settings
│  ├─ IP Address: 192.168.1.100 (static recommended)
│  ├─ Subnet Mask: 255.255.255.0
│  └─ Gateway: 192.168.1.1
└─ Port: 9100 (default for raw printing)
```

#### Step 2: Backend Print via TCP Socket

```typescript
// server/network-printer.ts
import * as net from 'net'

interface NetworkPrinterConfig {
  host: string // Printer IP
  port: number // Usually 9100
}

export async function printToNetworkPrinter(
  config: NetworkPrinterConfig,
  commands: Buffer
): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = new net.Socket()
    
    // Set timeout
    client.setTimeout(5000)
    
    // Connect to printer
    client.connect(config.port, config.host, () => {
      console.log('Connected to printer')
      
      // Send ESC/POS commands
      client.write(commands)
      
      // Close after sending
      setTimeout(() => {
        client.destroy()
        resolve()
      }, 1000)
    })
    
    client.on('error', (error) => {
      console.error('Printer error:', error)
      reject(error)
    })
    
    client.on('timeout', () => {
      client.destroy()
      reject(new Error('Printer timeout'))
    })
  })
}

// Usage:
export async function printNetworkReceipt(receiptData: any) {
  // Generate ESC/POS commands
  const commands = generateESCPOSCommands(receiptData)
  
  // Print to network printer
  await printToNetworkPrinter({
    host: process.env.PRINTER_IP || '192.168.1.100',
    port: 9100
  }, commands)
}

function generateESCPOSCommands(data: any): Buffer {
  const ESC = Buffer.from([0x1B])
  const GS = Buffer.from([0x1D])
  const commands: Buffer[] = []
  
  // Initialize
  commands.push(ESC, Buffer.from('@')) // ESC @
  
  // Center align
  commands.push(ESC, Buffer.from('a'), Buffer.from([0x01]))
  
  // Double size
  commands.push(GS, Buffer.from('!'), Buffer.from([0x11]))
  commands.push(Buffer.from('BELLA VISTA\n'))
  
  // Normal size
  commands.push(GS, Buffer.from('!'), Buffer.from([0x00]))
  commands.push(Buffer.from('123 Main Street\n'))
  commands.push(Buffer.from('New York, NY 10001\n'))
  commands.push(Buffer.from('\n'))
  
  // Left align
  commands.push(ESC, Buffer.from('a'), Buffer.from([0x00]))
  
  // Order number
  commands.push(Buffer.from(`Order #: ${data.orderNumber}\n`))
  commands.push(Buffer.from(`Date: ${new Date().toLocaleString()}\n`))
  commands.push(Buffer.from('\n'))
  
  // Dashed line
  commands.push(Buffer.from('--------------------------------\n'))
  
  // Items
  for (const item of data.items) {
    const line = `${item.name.padEnd(20)} $${item.price.toFixed(2)}\n`
    commands.push(Buffer.from(line))
    commands.push(Buffer.from(`  ${item.quantity} x $${item.price.toFixed(2)}\n`))
  }
  
  commands.push(Buffer.from('--------------------------------\n'))
  
  // Total
  commands.push(GS, Buffer.from('!'), Buffer.from([0x11])) // Double size
  commands.push(Buffer.from(`TOTAL: $${data.total.toFixed(2)}\n`))
  commands.push(GS, Buffer.from('!'), Buffer.from([0x00])) // Normal size
  
  // Cut paper
  commands.push(GS, Buffer.from('V'), Buffer.from([0x00]))
  
  return Buffer.concat(commands)
}
```



---

## Method 4: Cloud Print Service (For Modern Setup)

### When to Use:
- Multiple locations
- Remote printing
- Tablets/iPads without USB support
- Want managed solution

### Popular Services:

**1. Star CloudPRNT**
- Free service from Star Micronics
- Works with Star printers
- HTTPS-based
- Poll-based system

**2. PrintNode**
- $10/month per printer
- Works with any printer
- RESTful API
- Reliable and scalable

### PrintNode Implementation:

#### Step 1: Setup PrintNode

```bash
# Install PrintNode client on computer/server with printer
# Download from: https://www.printnode.com/en/download

# Install API client
npm install printnode
```

#### Step 2: Backend Integration

```typescript
// server/printnode-service.ts
import PrintNode from 'printnode'

const client = new PrintNode.HTTP({
  apiKey: process.env.PRINTNODE_API_KEY
})

export async function printWithPrintNode(
  printerId: number,
  receiptHTML: string
) {
  try {
    const printJob = {
      printerId: printerId,
      title: `Receipt-${Date.now()}`,
      contentType: 'pdf_uri', // or 'raw_uri', 'pdf_base64'
      content: receiptHTML, // Or PDF URL
      source: 'Bella Vista POS',
      options: {
        paper: '80mm', // Receipt paper size
        copies: 1
      }
    }
    
    const result = await client.createPrintJob(printJob)
    return result
    
  } catch (error) {
    console.error('PrintNode error:', error)
    throw error
  }
}

// Get list of printers
export async function getPrinters() {
  const printers = await client.printers()
  return printers
}
```

#### Step 3: API Endpoint

```typescript
// app/api/print/cloud/route.ts
import { NextResponse } from 'next/server'
import { printWithPrintNode } from '@/server/printnode-service'

export async function POST(request: Request) {
  const { receiptHTML, printerId } = await request.json()
  
  try {
    await printWithPrintNode(printerId, receiptHTML)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Print failed' },
      { status: 500 }
    )
  }
}
```

---

## Method 5: WebUSB API (Browser Direct Printing)

### When to Use:
- Modern browsers (Chrome/Edge)
- USB thermal printer
- No backend server needed
- Progressive Web App (PWA)

### Requirements:
- HTTPS (required for WebUSB)
- Chrome 61+ or Edge 79+
- User permission for USB device

### Implementation:

```typescript
// hooks/useUSBPrinter.ts
import { useState, useCallback } from 'react'

interface USBPrinter {
  device: USBDevice | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  print: (data: Uint8Array) => Promise<void>
  isConnected: boolean
}

export function useUSBPrinter(): USBPrinter {
  const [device, setDevice] = useState<USBDevice | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  
  const connect = useCallback(async () => {
    try {
      // Request USB device
      const selectedDevice = await navigator.usb.requestDevice({
        filters: [
          { vendorId: 0x04b8 }, // Epson
          { vendorId: 0x0519 }, // Star
          { vendorId: 0x154f }, // Bixolon
        ]
      })
      
      // Open device
      await selectedDevice.open()
      
      // Select configuration
      if (selectedDevice.configuration === null) {
        await selectedDevice.selectConfiguration(1)
      }
      
      // Claim interface
      await selectedDevice.claimInterface(0)
      
      setDevice(selectedDevice)
      setIsConnected(true)
      
      console.log('Printer connected:', selectedDevice.productName)
      
    } catch (error) {
      console.error('Failed to connect printer:', error)
      throw error
    }
  }, [])
  
  const disconnect = useCallback(async () => {
    if (device) {
      await device.close()
      setDevice(null)
      setIsConnected(false)
    }
  }, [device])
  
  const print = useCallback(async (data: Uint8Array) => {
    if (!device) {
      throw new Error('Printer not connected')
    }
    
    try {
      // Find the OUT endpoint
      const configuration = device.configuration
      const interfaceNumber = 0
      const interface_ = configuration?.interfaces[interfaceNumber]
      const alternate = interface_?.alternates[0]
      const endpoint = alternate?.endpoints.find(
        ep => ep.direction === 'out'
      )
      
      if (!endpoint) {
        throw new Error('No OUT endpoint found')
      }
      
      // Send data to printer
      await device.transferOut(endpoint.endpointNumber, data)
      
      console.log('Print job sent')
      
    } catch (error) {
      console.error('Print failed:', error)
      throw error
    }
  }, [device])
  
  return {
    device,
    connect,
    disconnect,
    print,
    isConnected
  }
}
```



#### Using WebUSB Printer:

```typescript
// components/POSWithUSBPrint.tsx
'use client'

import { useState } from 'react'
import { useUSBPrinter } from '@/hooks/useUSBPrinter'

export default function POSWithUSBPrint() {
  const printer = useUSBPrinter()
  const [order, setOrder] = useState(null)
  
  const handleConnectPrinter = async () => {
    try {
      await printer.connect()
      alert('Printer connected!')
    } catch (error) {
      alert('Failed to connect printer')
    }
  }
  
  const printReceipt = async (orderData: any) => {
    if (!printer.isConnected) {
      alert('Please connect printer first')
      return
    }
    
    // Generate ESC/POS commands
    const commands = generatePrintCommands(orderData)
    
    try {
      await printer.print(commands)
      alert('Receipt printed!')
    } catch (error) {
      alert('Print failed')
    }
  }
  
  return (
    <div className="pos-interface">
      <div className="toolbar">
        {!printer.isConnected ? (
          <button onClick={handleConnectPrinter}>
            Connect Printer
          </button>
        ) : (
          <div className="status">
            ✅ Printer Connected
            <button onClick={printer.disconnect}>
              Disconnect
            </button>
          </div>
        )}
      </div>
      
      <div className="order-actions">
        <button 
          onClick={() => printReceipt(order)}
          disabled={!printer.isConnected}
        >
          Print Receipt
        </button>
      </div>
    </div>
  )
}

// Generate ESC/POS commands
function generatePrintCommands(order: any): Uint8Array {
  const commands: number[] = []
  
  // ESC/POS command bytes
  const ESC = 0x1B
  const GS = 0x1D
  const LF = 0x0A // Line feed
  
  // Initialize
  commands.push(ESC, 0x40) // ESC @
  
  // Center align
  commands.push(ESC, 0x61, 0x01)
  
  // Double size
  commands.push(GS, 0x21, 0x11)
  addText(commands, 'BELLA VISTA\n')
  
  // Normal size
  commands.push(GS, 0x21, 0x00)
  addText(commands, '123 Main Street\n')
  addText(commands, 'New York, NY 10001\n')
  addText(commands, '\n')
  
  // Left align
  commands.push(ESC, 0x61, 0x00)
  
  addText(commands, `Order #: ${order.orderNumber}\n`)
  addText(commands, `Date: ${new Date().toLocaleString()}\n`)
  addText(commands, '\n')
  
  // Divider
  addText(commands, '--------------------------------\n')
  
  // Items
  for (const item of order.items) {
    addText(commands, `${item.name}\n`)
    addText(commands, `  ${item.quantity} x $${item.price.toFixed(2)}\n`)
  }
  
  addText(commands, '--------------------------------\n')
  
  // Total
  commands.push(GS, 0x21, 0x11) // Double size
  addText(commands, `TOTAL: $${order.total.toFixed(2)}\n`)
  commands.push(GS, 0x21, 0x00) // Normal size
  
  addText(commands, '\n')
  addText(commands, 'Thank you!\n')
  addText(commands, '\n\n\n')
  
  // Cut paper
  commands.push(GS, 0x56, 0x00)
  
  return new Uint8Array(commands)
}

function addText(commands: number[], text: string) {
  for (let i = 0; i < text.length; i++) {
    commands.push(text.charCodeAt(i))
  }
}
```

---

## Comparison of Methods

```
┌────────────────────────────────────────────────────────────────┐
│              METHOD COMPARISON TABLE                           │
├────────────────┬──────────┬──────────┬──────────┬──────────────┤
│ Method         │ Setup    │ Reliable │ Cost     │ Best For     │
├────────────────┼──────────┼──────────┼──────────┼──────────────┤
│ Browser Print  │ Easy     │ Medium   │ Free     │ Testing      │
│ ESC/POS USB    │ Medium   │ High     │ Free     │ Single POS   │
│ Network/IP     │ Medium   │ Very High│ Free     │ Professional │
│ Cloud Service  │ Easy     │ High     │ $10/mo   │ Multi-site   │
│ WebUSB API     │ Hard     │ Medium   │ Free     │ PWA/Tablet   │
└────────────────┴──────────┴──────────┴──────────┴──────────────┘
```

**Recommendations:**

**Small Restaurant (1-2 POS):**
- Use Network/IP printing (Method 3)
- One Ethernet thermal printer
- Most reliable and simple

**Multiple Locations:**
- Use Cloud Print Service (Method 4)
- Centralized management
- Remote troubleshooting

**Budget Constrained:**
- Start with Browser Print (Method 1)
- Upgrade to ESC/POS later

**Tech-Savvy / PWA:**
- Use WebUSB (Method 5)
- Modern, no backend needed
- Great for tablets



---

## Complete Working Example (Network Printer)

### Full Implementation for Restaurant POS

#### 1. Environment Setup

```env
# .env.local
PRINTER_IP=192.168.1.100
PRINTER_PORT=9100
```

#### 2. Print Server Utility

```typescript
// lib/printer.ts
import * as net from 'net'

export interface ReceiptData {
  orderNumber: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  subtotal: number
  tax: number
  total: number
  paymentMethod: string
  cashier: string
  timestamp: Date
}

export class ThermalPrinter {
  private host: string
  private port: number
  
  constructor(host: string, port: number) {
    this.host = host
    this.port = port
  }
  
  async print(data: ReceiptData): Promise<void> {
    const commands = this.generateCommands(data)
    
    return new Promise((resolve, reject) => {
      const client = new net.Socket()
      
      client.setTimeout(5000)
      
      client.connect(this.port, this.host, () => {
        client.write(commands)
        setTimeout(() => {
          client.destroy()
          resolve()
        }, 500)
      })
      
      client.on('error', reject)
      client.on('timeout', () => {
        client.destroy()
        reject(new Error('Printer timeout'))
      })
    })
  }
  
  private generateCommands(data: ReceiptData): Buffer {
    const buffers: Buffer[] = []
    
    // Helper to add text
    const add = (text: string) => buffers.push(Buffer.from(text))
    const cmd = (...bytes: number[]) => buffers.push(Buffer.from(bytes))
    
    const ESC = 0x1B
    const GS = 0x1D
    
    // Initialize
    cmd(ESC, 0x40)
    
    // Header - Center aligned, double size
    cmd(ESC, 0x61, 0x01) // Center
    cmd(GS, 0x21, 0x11) // Double size
    add('BELLA VISTA\n')
    cmd(GS, 0x21, 0x00) // Normal size
    add('123 Main Street\n')
    add('New York, NY 10001\n')
    add('Tel: (123) 456-7890\n\n')
    
    // Divider
    add('================================\n')
    
    // Order info - Left aligned
    cmd(ESC, 0x61, 0x00) // Left align
    add(`Order #: ${data.orderNumber}\n`)
    add(`Date: ${data.timestamp.toLocaleString()}\n`)
    add(`Cashier: ${data.cashier}\n`)
    add('================================\n\n')
    
    // Items
    for (const item of data.items) {
      const name = item.name.substring(0, 20).padEnd(20)
      const price = `$${item.price.toFixed(2)}`.padStart(8)
      add(`${name}${price}\n`)
      add(`  ${item.quantity} x $${item.price.toFixed(2)}\n`)
    }
    
    add('\n')
    add('================================\n')
    
    // Totals
    const padAmount = (label: string, amount: number) => {
      const amountStr = `$${amount.toFixed(2)}`.padStart(8)
      return `${label.padEnd(20)}${amountStr}\n`
    }
    
    add(padAmount('Subtotal:', data.subtotal))
    add(padAmount('Tax:', data.tax))
    add('================================\n')
    
    // Total - Bold and larger
    cmd(ESC, 0x45, 0x01) // Bold
    cmd(GS, 0x21, 0x11) // Double size
    add(padAmount('TOTAL:', data.total))
    cmd(GS, 0x21, 0x00) // Normal size
    cmd(ESC, 0x45, 0x00) // Bold off
    
    add('\n')
    add(`Payment: ${data.paymentMethod}\n`)
    add('\n')
    
    // Footer - Center aligned
    cmd(ESC, 0x61, 0x01)
    add('Thank you for dining with us!\n')
    add('Visit: www.bellavista.com\n')
    add('\n\n\n')
    
    // Cut paper
    cmd(GS, 0x56, 0x00)
    
    return Buffer.concat(buffers)
  }
}

// Singleton instance
let printerInstance: ThermalPrinter | null = null

export function getPrinter(): ThermalPrinter {
  if (!printerInstance) {
    printerInstance = new ThermalPrinter(
      process.env.PRINTER_IP || '192.168.1.100',
      Number(process.env.PRINTER_PORT) || 9100
    )
  }
  return printerInstance
}
```



#### 3. API Route

```typescript
// app/api/print/receipt/route.ts
import { NextResponse } from 'next/server'
import { getPrinter, type ReceiptData } from '@/lib/printer'

export async function POST(request: Request) {
  try {
    const data: ReceiptData = await request.json()
    
    // Validate data
    if (!data.orderNumber || !data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid receipt data' },
        { status: 400 }
      )
    }
    
    // Get printer instance
    const printer = getPrinter()
    
    // Print receipt
    await printer.print(data)
    
    console.log(`Receipt ${data.orderNumber} printed successfully`)
    
    return NextResponse.json({
      success: true,
      message: 'Receipt printed',
      orderNumber: data.orderNumber
    })
    
  } catch (error) {
    console.error('Print error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to print receipt',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Test endpoint
export async function GET() {
  try {
    const testReceipt: ReceiptData = {
      orderNumber: 9999,
      items: [
        { name: 'Test Item', quantity: 1, price: 10.00 }
      ],
      subtotal: 10.00,
      tax: 0.80,
      total: 10.80,
      paymentMethod: 'CASH',
      cashier: 'Test',
      timestamp: new Date()
    }
    
    const printer = getPrinter()
    await printer.print(testReceipt)
    
    return NextResponse.json({ success: true, message: 'Test print sent' })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Test print failed', details: error.message },
      { status: 500 }
    )
  }
}
```

#### 4. Frontend Hook

```typescript
// hooks/usePrintReceipt.ts
import { useState } from 'react'

interface PrintOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function usePrintReceipt() {
  const [isPrinting, setIsPrinting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const printReceipt = async (
    receiptData: any,
    options?: PrintOptions
  ) => {
    setIsPrinting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/print/receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receiptData)
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Print failed')
      }
      
      options?.onSuccess?.()
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      options?.onError?.(errorMessage)
      
    } finally {
      setIsPrinting(false)
    }
  }
  
  const testPrint = async () => {
    setIsPrinting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/print/receipt')
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error)
      }
      
      alert('Test print sent to printer')
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Test failed'
      setError(errorMessage)
      alert(`Test failed: ${errorMessage}`)
      
    } finally {
      setIsPrinting(false)
    }
  }
  
  return {
    printReceipt,
    testPrint,
    isPrinting,
    error
  }
}
```

#### 5. Usage in Component

```typescript
// components/POSCheckout.tsx
'use client'

import { useState } from 'react'
import { usePrintReceipt } from '@/hooks/usePrintReceipt'

export default function POSCheckout() {
  const { printReceipt, testPrint, isPrinting } = usePrintReceipt()
  const [order, setOrder] = useState(null)
  
  const completeOrder = async (paymentMethod: string) => {
    // 1. Create order in database
    const newOrder = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        items: cart.items,
        paymentMethod,
        // ... other data
      })
    }).then(r => r.json())
    
    setOrder(newOrder)
    
    // 2. Print receipt automatically
    await printReceipt({
      orderNumber: newOrder.orderNumber,
      items: newOrder.items,
      subtotal: newOrder.subtotal,
      tax: newOrder.tax,
      total: newOrder.total,
      paymentMethod: newOrder.paymentMethod,
      cashier: currentUser.name,
      timestamp: new Date(newOrder.timestamp)
    }, {
      onSuccess: () => {
        console.log('Receipt printed')
        // Clear cart, show success message
      },
      onError: (error) => {
        alert(`Print failed: ${error}. Order saved but receipt not printed.`)
      }
    })
  }
  
  return (
    <div className="checkout">
      <button onClick={() => completeOrder('CASH')} disabled={isPrinting}>
        {isPrinting ? 'Printing...' : 'Complete Order (Cash)'}
      </button>
      
      <button onClick={() => completeOrder('CARD')} disabled={isPrinting}>
        {isPrinting ? 'Printing...' : 'Complete Order (Card)'}
      </button>
      
      <button onClick={testPrint} className="test-btn">
        Test Printer
      </button>
    </div>
  )
}
```



---

## Hardware Recommendations

### Best Thermal Receipt Printers for Restaurants

**Budget Option ($150-250):**
1. **Epson TM-T20III**
   - USB, Ethernet, or Bluetooth
   - 80mm paper width
   - Reliable and popular
   - Easy ESC/POS compatibility

2. **Star Micronics TSP143IIIU**
   - USB interface
   - Fast printing
   - Durable for high-volume
   - Good software support

**Mid-Range ($300-500):**
3. **Epson TM-T88VI**
   - USB + Ethernet
   - Very fast (350mm/sec)
   - Industry standard
   - Excellent reliability

4. **Bixolon SRP-350plusIII**
   - Multiple interfaces
   - Compact design
   - Good value

**Premium ($500+):**
5. **Star mC-Print3**
   - Cloud-ready
   - Bluetooth + WiFi + USB + Ethernet
   - Modern design
   - Hub functionality

### Receipt Paper

**Specifications:**
- Width: 80mm (standard) or 58mm (compact)
- Core: 12mm or 25mm
- Length: 50-80 meters per roll
- Quality: Thermal (heat-sensitive)

**Recommended Brands:**
- Gorilla Supply
- MUNBYN
- PM Company
- Cost: $15-30 for 50 rolls

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Printer Not Found

**Problem:** Cannot connect to printer

**Solutions:**
```typescript
// Check network connectivity
const checkPrinter = async (ip: string) => {
  return new Promise((resolve) => {
    const client = new net.Socket()
    client.setTimeout(2000)
    
    client.connect(9100, ip, () => {
      console.log('✅ Printer reachable')
      client.destroy()
      resolve(true)
    })
    
    client.on('error', () => {
      console.log('❌ Printer not reachable')
      resolve(false)
    })
    
    client.on('timeout', () => {
      console.log('❌ Connection timeout')
      client.destroy()
      resolve(false)
    })
  })
}

// Usage
const isOnline = await checkPrinter('192.168.1.100')
```

**Checklist:**
- [ ] Printer powered on
- [ ] Network cable connected (if Ethernet)
- [ ] Printer on same network
- [ ] Correct IP address
- [ ] Port 9100 not blocked by firewall
- [ ] Printer not in error state

#### 2. Garbled Text

**Problem:** Receipt prints weird characters

**Solution:**
- Check encoding (use 'utf8' or 'ascii')
- Verify ESC/POS commands are correct
- Try resetting printer (ESC @)

```typescript
// Reset printer before printing
const commands = []
commands.push(0x1B, 0x40) // ESC @ - Initialize
// ... rest of commands
```

#### 3. Paper Not Cutting

**Problem:** Receipt doesn't cut automatically

**Solution:**
```typescript
// Full cut command
commands.push(0x1D, 0x56, 0x00) // GS V 0

// Partial cut command (leaves small connection)
commands.push(0x1D, 0x56, 0x01) // GS V 1

// Try multiple cuts if necessary
commands.push(0x1D, 0x56, 0x00)
commands.push(0x1D, 0x56, 0x00)
```

#### 4. Print Job Doesn't Start

**Problem:** No error but nothing prints

**Solutions:**
- Check printer status (may be out of paper)
- Verify data is being sent (add logging)
- Try shorter timeout
- Check printer queue/spooler

```typescript
// Add debugging
const print = async (data: Buffer) => {
  console.log('Sending bytes:', data.length)
  console.log('First 20 bytes:', Array.from(data.slice(0, 20)))
  
  // Send data...
  
  console.log('Data sent successfully')
}
```

#### 5. Slow Printing

**Problem:** Receipt takes long to print

**Solutions:**
- Use network printing instead of USB over network
- Reduce image/logo size
- Simplify formatting
- Check network latency

```typescript
// Measure print time
const startTime = Date.now()
await printer.print(data)
const duration = Date.now() - startTime
console.log(`Print took ${duration}ms`)
```

---

## Best Practices

### 1. Error Handling

```typescript
async function printWithRetry(
  data: ReceiptData,
  maxRetries = 3
): Promise<void> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await getPrinter().print(data)
      return // Success
      
    } catch (error) {
      console.error(`Print attempt ${attempt} failed:`, error)
      
      if (attempt === maxRetries) {
        // Last attempt failed
        // Save to print queue for later
        await saveToPrintQueue(data)
        throw new Error('Print failed after retries')
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}
```

### 2. Print Queue System

```typescript
// For handling offline scenarios
interface PrintJob {
  id: string
  data: ReceiptData
  attempts: number
  createdAt: Date
  status: 'pending' | 'printing' | 'failed' | 'completed'
}

const printQueue: PrintJob[] = []

async function addToPrintQueue(data: ReceiptData) {
  const job: PrintJob = {
    id: crypto.randomUUID(),
    data,
    attempts: 0,
    createdAt: new Date(),
    status: 'pending'
  }
  
  printQueue.push(job)
  processPrintQueue()
}

async function processPrintQueue() {
  for (const job of printQueue) {
    if (job.status === 'pending' && job.attempts < 3) {
      try {
        job.status = 'printing'
        await getPrinter().print(job.data)
        job.status = 'completed'
        
      } catch (error) {
        job.attempts++
        job.status = job.attempts >= 3 ? 'failed' : 'pending'
      }
    }
  }
  
  // Remove completed jobs
  printQueue = printQueue.filter(j => j.status !== 'completed')
}
```

### 3. Printer Status Monitoring

```typescript
// Periodically check printer health
setInterval(async () => {
  const isOnline = await checkPrinter(printerIP)
  
  if (!isOnline) {
    console.warn('Printer offline!')
    // Notify user, show warning icon
  }
}, 30000) // Check every 30 seconds
```

---

## Summary

### Quick Decision Guide:

**Choose Method 1 (Browser Print) if:**
- Just testing/prototyping
- Using standard office printer
- Not concerned about formatting

**Choose Method 2 (ESC/POS USB) if:**
- Single POS station
- Have thermal printer with USB
- Want professional receipts

**Choose Method 3 (Network/IP) if:** ⭐ RECOMMENDED
- Professional restaurant setup
- Multiple POS stations
- Want most reliable solution

**Choose Method 4 (Cloud Service) if:**
- Multiple locations
- Want managed solution
- Budget allows $10/month

**Choose Method 5 (WebUSB) if:**
- Building PWA
- Modern browser only
- No backend server

### Implementation Steps:

1. **Buy printer** - Epson TM-T20III or similar ($150-250)
2. **Connect to network** - Set static IP address
3. **Install dependencies** - `npm install` required packages
4. **Copy code** - Use Method 3 complete example above
5. **Test** - Use test endpoint `/api/print/receipt` GET
6. **Integrate** - Call from your order completion flow
7. **Deploy** - Push to production

**Total Time:** 2-4 hours for basic implementation
**Total Cost:** $150-300 for printer + paper

---

**Document Created:** June 24, 2026  
**Last Updated:** June 24, 2026  
**Status:** Production Ready
