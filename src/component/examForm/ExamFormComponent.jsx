import React from 'react';
import PrintPage from '../../PrintPage';
import { Table } from 'flowbite-react';

const ExamFormComponent = () => {
    const handlePrint = () => {
        const printContents = document.getElementById('printableArea').innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // To reload and return to the original state
    };

    return (
        <>
            <div id="printableArea">
                <div className="battambang-bold text-[14px] text-center border-b-2 border-black mx-28 p-5">
                    <div>វិញ្ញាសាប្រឡងបញ្ចប់ឆមាស</div>
                    <div>ឆ្នាំទី០៣ ឆមាសទី០២</div>
                    <div>មុខវិជ្ជាៈ C Programming (ព័ត៌មានវិទ្យា) (ល្ងាច)</div>
                    <div>សាស្រ្តាចារ្យ៖ ផាត់ ឧត្តម</div>
                </div>
                <div className="battambang-bold text-[14px] text-left p-5">
                    <div>I.	ចូរបំពេញពាក្យបច្ចេកទេស (១០ ពិន្ទុ)</div>
                    <Table className=''>
                        <tr className=''>
                            <th className='border p-2'>1</th>
                            <th className='border p-2'>2</th>
                            <th className='border p-2'>3</th>
                            <th className='border p-2'>2</th>
                            <th className='border p-2'>2</th>
                            <th className='border p-2'>3</th>
                        </tr>
                        <tr className=''>
                            <th className='border p-2'>1</th>
                            <th className='border p-2'>2</th>
                            <th className='border p-2'>3</th>
                            <th className='border p-2'>2</th>
                            <th className='border p-2'>2</th>
                            <th className='border p-2'>3</th>
                        </tr>

                    </Table>
                    <div className='p-5'>
                        <p className='mt-2'>1. <span>_________</span>គឺប្រើសម្រាប់ប្រកាស variableជំនួសការដកឃ្លា </p>
                        <p className='mt-2'>2. <span>_________</span>គឺប្រើសម្រាប់ប្រកាស variableជំនួសការដកឃ្លា </p>
                        <p>3. <span>_________</span>គឺប្រើសម្រាប់ប្រកាស variableជំនួសការដកឃ្លា </p>
                        <p>4. <span>_________</span>គឺប្រើសម្រាប់ប្រកាស variableជំនួសការដកឃ្លា </p>
                        <p>5. <span>_________</span>គឺប្រើសម្រាប់ប្រកាស variableជំនួសការដកឃ្លា </p>
                    </div>
                </div>
                <div className="battambang-bold text-[14px] text-left p-5">
                    <div>II.ចូរផ្គូរផ្គងពាក្យនៅក្នុងកូឡោន“A”ជាមួយពាក្យនៅក្នុងកូឡោន“B”(១៥ពិន្ទុ)</div>
                    <Table className=''>
                        <tr className=''>
                            <th className='border p-2'>ពាក្យបច្ចេកទេស (A)</th>
                            <th className='border p-2'>និយមន័យ (B)</th>
                            <th className='border p-2'>ចម្លើយ (C)</th>
                        </tr>
                        <tr className=''>
                            <td className='border p-2'>1</td>
                            <td className='border p-2'>2</td>
                            <td className='border p-2'>3</td>
                        </tr>
                        <tr className=''>
                            <td className='border p-2'>1</td>
                            <td className='border p-2'>2</td>
                            <td className='border p-2'>3</td>
                        </tr>
                        <tr className=''>
                            <td className='border p-2'>1</td>
                            <td className='border p-2'>2</td>
                            <td className='border p-2'>3</td>
                        </tr>
                        <tr className=''>
                            <td className='border p-2'>1</td>
                            <td className='border p-2'>2</td>
                            <td className='border p-2'>3</td>
                        </tr>
                        <tr className=''>
                            <td className='border p-2'>1</td>
                            <td className='border p-2'>2</td>
                            <td className='border p-2'>3</td>
                        </tr>

                    </Table>
                </div>
                <div className="battambang-bold text-[14px] text-left p-5">
                    <div>III. សូមជ្រើសរើសចម្លើយដែលត្រឹមត្រូវដាក់នៅក្នុងតារាងខាងក្រោម</div>
                    <div className='mx-10'>
                        <div>
                            <p className='my-5'>1.តើនៅក្នុងភាសា C គេប្រើអនុគមន៏ អ្វីដើម្បីបញ្ចេញទិន្ន័យមកលើ screen?</p>
                            <Table >
                                <tr >
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                </tr>
                            </Table>
                        </div>
                        <div>
                            <p className='my-5'>1.តើនៅក្នុងភាសា C គេប្រើអនុគមន៏ អ្វីដើម្បីបញ្ចេញទិន្ន័យមកលើ screen?</p>
                            <Table >
                                <tr >
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                </tr>
                            </Table>
                        </div>
                        <div>
                            <p className='my-5'>1.តើនៅក្នុងភាសា C គេប្រើអនុគមន៏ អ្វីដើម្បីបញ្ចេញទិន្ន័យមកលើ screen?</p>
                            <Table >
                                <tr >
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                </tr>
                            </Table>
                        </div>
                        <div>
                            <p className='my-5'>1.តើនៅក្នុងភាសា C គេប្រើអនុគមន៏ អ្វីដើម្បីបញ្ចេញទិន្ន័យមកលើ screen?</p>
                            <Table >
                                <tr >
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                    <th>A) .ptrintf()</th>
                                </tr>
                            </Table>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className='my-5'>*សូមបំពេញចម្លើយរបស់អ្នកនៅក្នុងតារាងខាងក្រោម៖</p>
                            <Table >
                                <tr className='border p-2' >
                                    <th className='border p-2'>A) .ptrintf()</th>
                                    <th className='border p-2'>A) .ptrintf()</th>
                                    <th className='border p-2'>A) .ptrintf()</th>
                                    <th className='border p-2'>A) .ptrintf()</th>
                                </tr>
                                <tr >
                                    <td className='border p-2'>A) .ptrintf()</td>
                                    <td className='border p-2'>A) .ptrintf()</td>
                                    <td className='border p-2'>A) .ptrintf()</td>
                                    <td className='border p-2'>A) .ptrintf()</td>
                                </tr>
                            </Table>
                        </div>
                    </div>
                </div>
                <div className="battambang-bold text-[14px] text-left p-5">
                    <div>V.	ផ្នែកលំហាត់ (៣៥ ពិន្ទុ)</div>
                    <div className='mx-10'>
                        <div>
                            <p className='my-5'>A.(១០ ពិន្ទុ) ចូរសរសេរកូដនៅក្នុងប៊ូតុង Submitដែលមានរូបខាងក្រោម។</p>
                            <img src="https://img.freepik.com/premium-photo/mountain-lake-with-lake-mountains-background_662214-103892.jpg?w=1060" alt="Mountain Lake" />
                        </div>
                        <div>
                            <p className='my-5'>B.(១០ ពិន្ទុ) ចូរសរសេរកូដនៅក្នុងប៊ូតុង Submitដែលមានរូបខាងក្រោម។</p>
                            <img src="https://img.freepik.com/premium-photo/mountain-lake-with-lake-mountains-background_662214-103892.jpg?w=1060" alt="Mountain Lake" />
                        </div>
                        <div>
                            <p className='my-5'>C.(១៥ ពិន្ទុ) ចូរសរសេរកូដនៅក្នុងប៊ូតុង Submitដែលមានរូបខាងក្រោម។</p>
                            <img src="https://img.freepik.com/premium-photo/mountain-lake-with-lake-mountains-background_662214-103892.jpg?w=1060" alt="Mountain Lake" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <PrintPage /> */}
            <button onClick={handlePrint}>Print</button>
        </>
    );
}

export default ExamFormComponent;
